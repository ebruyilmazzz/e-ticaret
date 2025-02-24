import { getCurrentUser } from "@/app/actions/getCurrentUser";
import CardCount from "./CardCount";
import HamburgerMenu from "./hamburgerMenu";
import Logo from "./Logo";
import Search from "./search";  
import User from "./User";

const Navbar = async () => { 
  const currentUser = await getCurrentUser();

  const formattedUser = currentUser
    ? {
        ...currentUser,
        createdAt: new Date(currentUser.createdAt),
        updatedAt: new Date(currentUser.updatedAt),
        emailVerified: currentUser.emailVerified ? new Date(currentUser.emailVerified) : null,
      }
    : null;

  return (
    <div className="flex items-center justify-between gap-3 md:gap-10 h-16 bg-violet-300 text-slate-100">
      <Logo />
      <Search />
      <CardCount />
      <User currentUser={formattedUser} />
      <HamburgerMenu />
    </div>
  );
};

export default Navbar;
