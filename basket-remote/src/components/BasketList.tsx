import { List, Button, Drawer } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "host/store";
import BasketItem from "./BasketItem";
import { useState } from "react";
import { clearCart } from "host/selectedProductSlice";

const BasketList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProduct.items
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        View Basket (
        {selectedProducts.reduce((sum, item) => sum + item.quantity, 0)})
      </Button>

      <Drawer
        title="Your Basket"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        {selectedProducts.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between", height: "100%" }}>
            <List
              dataSource={selectedProducts}
              renderItem={(product) => (
                <BasketItem key={product.id} product={product} />
              )}
            />
            <Button onClick={() => handleClearCart()} danger>
              Clear all
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default BasketList;
