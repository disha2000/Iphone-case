export const convertBlobUrlToFile = async (blobUrl, fileName) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };
  
export const totalCartItemCount = (carts) => {
  const cartItemCount = carts.reduce((totalCount, cart) => {
    return totalCount + cart.quantity;
  }, 0)
  return cartItemCount
}