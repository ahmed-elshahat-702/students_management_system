import StudentForm from "@/components/StudentForm";

export default function page() {
  return (
    <div className="container mx-auto py-8">
      <StudentForm initialData={null} isEditMode={false} />
    </div>
  );
}
