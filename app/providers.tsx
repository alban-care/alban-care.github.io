import { ModeProvider } from "@/components/mode-provider";
import { appModeDefault } from "@/lib/config";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ModeProvider
      attribute="class"
      defaultTheme={appModeDefault}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ModeProvider>
  );
}
