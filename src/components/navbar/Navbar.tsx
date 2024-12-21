/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-18 19:32:53
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-21 12:44:03
 * @FilePath: /Recipe_Finder/src/components/navbar/Navbar.tsx
 */

import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";
interface NavbarProps {
  onSearch: (query: string) => void;
  onClickIcon: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ onSearch, onClickIcon }) => {

  return (
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row item-center item-center justify-between gap-3 md:gap-0">
            <Logo onClickIcon={onClickIcon}/>
            <Search onSearch={onSearch}/>
            <Menu />
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
