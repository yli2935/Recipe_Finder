/*
 * @Author: Adam Li adam@bizzone.com
 * @Date: 2024-12-20 15:31:12
 * @LastEditors: Adam Li
 * @LastEditTime: 2024-12-20 15:31:19
 * @FilePath: /Recipe_Finder/src/components/MenuItem.tsx
 */

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
			px-4
			py-3
			hover:bg-neutral-100
			transition
			font-semibold
			"
    >
      {label}
    </div>
  );
};

export default MenuItem;
