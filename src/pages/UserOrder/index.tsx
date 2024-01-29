import OrderCart from './components/OrderCart';

const UserOrder = () => {
  return (
    <main className="w-full">
      <div className="w-full flex flex-col gap-4 mb-4">
        <h1 className="text-xl">Order history</h1>
        <span className="text-muted-foreground">6 orders</span>
      </div>
      <div className="w-full flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <OrderCart key={idx} />
        ))}
      </div>
    </main>
  );
};

export default UserOrder;
