import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DescriptionContainer from '../components/containers/description-container';


Enzyme.configure({ adapter: new Adapter() });

describe('DescriptionContainer', () => {
  it('All tags should be stripped from description before display', () => {
    const description = '<script src="http://example.com/example.js"></script>word1 <b>word2</b> <blockquote>word3</blockquote><br>';
    const dc = Enzyme.mount(<DescriptionContainer rawDescription={description} />);
    const descriptionElm = dc.find('.description');
    expect(descriptionElm.html()).toContain('word1 word2 word3');
  });

  it('Line breaks should be converted to <br> elements in description', () => {
    const description = 'Mozilla\nbuilds\n\nthe\rFirefox\nbrowser';
    const dc = Enzyme.mount(<DescriptionContainer rawDescription={description} />);
    const descriptionElm = dc.find('.description');
    expect(descriptionElm.html()).toContain('Mozilla<br>\nbuilds<br>\n<br>\nthe<br>\nFirefox<br>\nbrowser');
  });
});
