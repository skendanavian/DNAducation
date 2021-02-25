import React from 'react';

import LoadingButton from '../components/LoadingButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "LoadingButton",
  component: LoadingButton,

  argTypes: {
    handleClick: { action: "clicked" },
    label: { control: { type: "text" } },
    color: {
      control: {
        type: "select",
        options: ['default', "primary", "secondary"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["large", "medium", "small"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["contained", "outlined", "text"],
      },
    },
  },
};

const Template = (args) => <LoadingButton {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading:true,
  label: 'Start Exam',
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  success:true,
  label: 'Start Exam',
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error:true,
  label: 'Start Exam',
};

