import { shallow } from 'enzyme';

import App from './';

describe('<App /> Tests', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<App />);
    });
});
