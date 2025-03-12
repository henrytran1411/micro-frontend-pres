import { Tabs } from 'antd';

const CategoryTabs = () => {
  return (
    <Tabs
      defaultActiveKey="bottles"
      items={[
        { key: 'bottles', label: 'Bottles' },
        { key: 'mugs', label: 'Mugs' },
      ]}
      className="mb-4"
    />
  );
};

export default CategoryTabs;
