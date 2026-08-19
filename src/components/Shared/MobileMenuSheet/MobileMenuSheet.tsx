"use client";

import Link from "next/link";
import { ChevronDown, Phone, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { CONTACT_PHONE, MENU_ITEMS, OPEN_HOURS } from "../Navbar/menuItems";

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  openSubmenu: string | null;
  onToggleSubmenu: (href: string) => void;
}

const MobileMenuSheet = ({
  isOpen,
  onClose,
  openSubmenu,
  onToggleSubmenu,
}: MobileMenuSheetProps) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-x-0 top-0 bottom-16 z-95 bg-ink-950/60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* SHEET */}
      <div
        className={`fixed inset-x-0 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-95 mx-auto max-h-[80vh] max-w-md rounded-t-3xl bg-ink-950 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
        }`}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/15" />

        <div className="flex items-center justify-between px-6 pb-4 pt-3">
          <Logo variant="light" size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(80vh-72px)] overflow-y-auto px-6 pb-24">
          <div className="space-y-4">
            {MENU_ITEMS.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block w-full text-left text-base font-medium text-white hover:text-orange-400 transition"
                  >
                    {item.display}
                  </Link>
                );
              }

              const isSubmenuOpen = openSubmenu === item.href;

              return (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-base font-medium text-white hover:text-orange-400 transition"
                    >
                      {item.display}
                    </Link>
                    <button
                      type="button"
                      onClick={() => onToggleSubmenu(item.href)}
                      aria-label={`Toggle ${item.display} submenu`}
                      aria-expanded={isSubmenuOpen}
                      className="flex h-8 w-8 items-center justify-center text-white"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          isSubmenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isSubmenuOpen && (
                    <div className="mt-2 space-y-3 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block text-sm text-white/60 hover:text-orange-400 transition"
                        >
                          {child.display}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-base font-medium text-white hover:text-orange-400 transition"
            >
              <Phone size={16} className="text-orange-400" />
              {CONTACT_PHONE}
            </a>
            <p className="text-xs text-white/40">{OPEN_HOURS}</p>

            <Link
              href="/shop"
              onClick={onClose}
              className="block w-full text-center bg-orange-500 text-white py-2 rounded-lg mt-2 font-semibold hover:bg-orange-600 transition"
            >
              Preorder Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenuSheet;
