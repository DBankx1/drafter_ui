import { redirect } from "next/navigation";
import { WidgetProvider } from "@/components/ui/widget/context";
import { WidgetSettingsForm } from "@/components/ui/widget/settings-form";
import { getWidget } from "@/lib/widget/widget-service";

export default async function Page() {
  let widget = null;
  try {
    widget = await getWidget();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="p-2 md:p-4">
      <WidgetProvider initialWidget={widget}>
        <WidgetSettingsForm />
      </WidgetProvider>
    </div>
  );
}
