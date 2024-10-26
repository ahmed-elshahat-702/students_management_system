import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import EntityTable from "./EntityTable";
import { FaPlus } from "react-icons/fa";

const EntityPage = ({
  fetchEntities,
  deleteEntity,
  entityType,
  addEntityUrl,
}) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllEntities();
  }, []);

  const fetchAllEntities = async () => {
    setLoading(true);
    try {
      const data = await fetchEntities();
      entityType === "Student" && setEntities(data.students || []);
      entityType === "Teacher" && setEntities(data.teachers || []);
    } catch (error) {
      toast.error(error || `Failed to fetch ${entityType.toLowerCase()}s`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntity = async (entity) => {
    setLoading(true);
    toast.loading(`Deleting ${entityType.toLowerCase()}...`);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${entityType.toLowerCase()}?`
    );
    if (!confirmDelete) {
      toast.dismiss();
      setLoading(false);
      return;
    }

    try {
      const response = await deleteEntity(entity.username);
      toast.dismiss();
      toast.success(response.message);
      fetchAllEntities();
    } catch (error) {
      toast.dismiss();
      toast.error(error || `An error occurred while deleting`);
    } finally {
      setLoading(false);
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
        />
      </div>
    </main>
  );
};

export default EntityPage;
