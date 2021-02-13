import { shallow } from 'enzyme';

import CartDropdown from './Cart-dropdown';

describe('Cart Dropdown Component tests', () => {
  it('expect to render Cart Dropdown component', () => {
    expect(shallow(<CartDropdown />)).toMatchSnapshot();
  });
});
