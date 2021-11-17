export const setDataListKey = p =>
  p.map((x, i) => {
    const data = {
      id: x.id,
      name: x.name,
      price: x.price,
      status: x.status,
      description: x.description,
    };
    return data;
  });
