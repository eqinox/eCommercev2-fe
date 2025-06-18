import { UserButton } from '../user-button';
import ThemeToggle from './theme-toggle';

const Menu = () => {
  return (
    <div className="flex items-center space-x-4">
      <ThemeToggle />
      <UserButton />
    </div>
  );
};

export default Menu;
