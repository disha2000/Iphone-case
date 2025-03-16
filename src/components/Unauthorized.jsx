const Unauthorized = () => {
  return (
    <div className="text-center">
      <h1 className="md:text-9xl text-8xl font-extrabold mb-3">403</h1>
      <h3 className="md:text-3xl text-2xl font-extrabold mb-3">Forbidden</h3>
      <p className="font-bold">
        You do not have permission to access this resource.
      </p>
    </div>
  );
};
export default Unauthorized;
