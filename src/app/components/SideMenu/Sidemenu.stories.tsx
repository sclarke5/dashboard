import React from 'react';
import { Sidemenu } from './Sidemenu';

// export default {
//   children: '',
//   title: 'Component/Sidemenu',
//   component: Sidemenu
// }

const Template = (args: any) => {
  return (
    <Sidemenu {...args} />
  )
}

const props = {
  defaultProps: () => ({})
}

export const SidemenuStory: any = Template.bind({});
const defaultProps = props.defaultProps();
SidemenuStory.storyName = 'Sidemenu';
SidemenuStory.args = {
  ...defaultProps
}