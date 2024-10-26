import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";

const EntityTable = ({ entities, loading, deleteEntity, entityType }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{`${entityType} List`}</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid"></div>
        </div>
      ) : entities.length > 0 ? (
        <table className="min-w-full table-auto bg-white shadow-md rounded overflow-hidden">
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
            {entities.map((entity) => (
              <tr key={entity.username} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {entity.fullName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {entity.code}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {entity.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {entity.password}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2">
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
