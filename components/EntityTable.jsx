import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EntityTable = ({
  entities,
  loading,
  deleteEntity,
  entityType,
  fetchAllEntities,
}) => {
  const router = useRouter();
  const handleEdit = (entity) => {
    router.push(
      `/moderator/${entityType.toLowerCase()}s/edit-${entityType.toLowerCase()}/${
        entity._id
      }`
    );
  };
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{`${entityType} List`}</h2>
        <Button
          onClick={() => fetchAllEntities()}
          className="bg-background hover:bg-background/70 text-foreground rounded flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Refreshing...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh List
            </>
          )}
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid"></div>
        </div>
      ) : entities.length !== 0 ? (
        <table className="min-w-full table-auto bg-background shadow-md rounded overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                {`${entityType} Name`}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                {`${entityType} Code`}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Functions
              </th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity, index) => (
              <tr
                key={entity.username}
                className={`hover:bg-secondary/70 ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary"
                }`}
              >
                <td className="px-6 py-4 text-sm">{entity.fullName}</td>
                <td className="px-6 py-4 text-sm">{entity.code}</td>
                <td className="px-6 py-4 text-sm">{entity.username}</td>
                <td className="px-6 py-4 text-sm">{entity.password}</td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
                    onClick={() => handleEdit(entity)}
                    disabled={loading}
                  >
                    Edit <FaEdit />
                  </Button>
                  <Button
                    className={`bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => deleteEntity(entity)}
                    disabled={loading}
                  >
                    Delete <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center text-2xl font-bold">
          There are no {entityType.toLowerCase()}s yet
        </h1>
      )}
    </>
  );
};

export default EntityTable;
