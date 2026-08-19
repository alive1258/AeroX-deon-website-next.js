export interface MenuItem {
  display: string;
  href: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  { display: "Home", href: "/" },
  { display: "Shop", href: "/shop" },
  { display: "Features", href: "/features" },
  { display: "About Us", href: "/about" },
  { display: "Contact", href: "/contact" },
];

// TODO: replace with the drone company's real support phone number/hours
export const CONTACT_PHONE = "+1 (202) 555-0198";
export const OPEN_HOURS = "Mon - Fri, 9am - 6pm EST";
