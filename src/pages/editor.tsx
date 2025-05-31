import { useParams } from "wouter";
import PresentationEditor from "@/components/presentation-editor";

export default function Editor() {
  const { id } = useParams<{ id?: string }>();
  const presentationId = id ? parseInt(id) : undefined;

  return <PresentationEditor presentationId={presentationId} />;
}
