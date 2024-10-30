import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import EntityTable from "./EntityTable";
import { FaPlus } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";
import { useEdgeStore } from "@/lib/edgestore";

const EntityPage = ({
  fetchEntities,
  deleteEntity,
  entityType,
  addEntityUrl,
}) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState(null);
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    fetchAllEntities();
  }, [fetchEntities, entityType]);

  const fetchAllEntities = async () => {
    setLoading(true);
    try {
      const data = await fetchEntities();
      if (entityType === "Student") {
        setEntities(data.students || []);
      } else if (entityType === "Teacher") {
        setEntities(data.teachers || []);
      } else {
        setEntities(data || []);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error.message || `Failed to fetch ${entityType.toLowerCase()}s`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntity = (entity) => {
    setEntityToDelete(entity);
    setIsModalOpened(true);
  };

  const handleConfirmDelete = async () => {
    toast({
      description: `Deleting ${entityType.toLowerCase()}...`,
      variant: "loading",
    });
    try {
      if (entityToDelete.avatar) {
        await edgestore.publicFiles.delete({
          url: entityToDelete.avatar,
        });
      }
      const res = await deleteEntity(entityToDelete._id);
      toast({
        title: "Success",
        description: res.message || `${entityType} deleted successfully`,
      });
      await fetchAllEntities();
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error.message || `Failed to delete ${entityType.toLowerCase()}`,
      });
    } finally {
      setEntityToDelete(null);
      setIsModalOpened(false);
    }
  };

  return (
    <main className="p-6 flex-1">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{`Add ${entityType}`}</h2>
          <Link
            href={addEntityUrl}
            className="w-fit p-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
          >
            Add {entityType}
            <FaPlus className="fill-white" />
          </Link>
        </div>
        <EntityTable
          entities={entities}
          loading={loading}
          deleteEntity={handleDeleteEntity}
          entityType={entityType}
          fetchAllEntities={fetchAllEntities}
        />
        {isModalOpened && (
          <ConfirmModal
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            onConfirm={handleConfirmDelete}
            title={`Delete ${entityType}`}
            description={`Are you sure you want to delete this ${entityType.toLowerCase()}?`}
          />
        )}
      </div>
    </main>
  );
};

export default EntityPage;
