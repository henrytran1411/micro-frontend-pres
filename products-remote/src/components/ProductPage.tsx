import { Typography } from "antd";
import ProductList from "@/components/ProductList";
import CategoryTabs from "@/components/CategoryTabs";

const { Title, Text } = Typography;

const ProductPage = () => {
  return (
    <div>
      <Title level={3}>Organic Products</Title>
      <Text>
        Reusable bottles and mugs, t-shirts are eco-friendly alternatives to single-use
        plastics.
      </Text>

      <CategoryTabs />
      <ProductList />
    </div>
  );
};

export default ProductPage;
