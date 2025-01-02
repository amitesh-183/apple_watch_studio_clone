import "./globals.css";
import { DropdownProvider } from "./context/Dropdown/DropdownContext";
import { ActiveIndexProvider } from "./context/ActiveIndex/ActiveIndexContext";
import { SelectionProvider } from "./context/WatchSelect/WatchSelectContext";


export const metadata = {
  title: "Create Your Apple Watch Series 10 Style - Apple",
  description: "Choose an Apple Watch and case. Pair any band. Express your style with a variety of colors, finishes, and materials in the Apple Watch Studio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <DropdownProvider>
          <ActiveIndexProvider>
            <SelectionProvider>
              {children}
            </SelectionProvider>
          </ActiveIndexProvider>
        </DropdownProvider>
      </body>
    </html>
  );
}
