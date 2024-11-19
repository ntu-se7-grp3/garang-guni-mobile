export function getBookingIds(response) {
  const bookingIds = [];
  if (response.status === 200) {
    for (const booking of response.body) {
      bookingIds.push(booking.bookingId);
    }
  }
  return bookingIds;
}

export function getItemIds(response) {
  const itemIds = [];
  if (response.status === 200) {
    for (const item of response.body) {
      itemIds.push(item.itemId);
    }
  }
  return itemIds;
}

export function generateBookingSummary(bookingResponse) {
  const bookingData = bookingResponse.body[0].booking;
  const address = bookingData.location.locationAddress;
  const bookingDateTime = new Date(bookingData.bookingDateTime);
  const formattedDate = `${bookingDateTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} (${bookingDateTime.toLocaleDateString("en-GB", {
    weekday: "long",
  })})`;
  const time = `${bookingDateTime.getHours() < 12 ? "Morning" : "Afternoon"}`;

  const itemNames = bookingResponse.body.map((item) => item.itemName);
  const remarks = bookingData.remarks || "--";
  const bookingSummary = {
    address,
    date: formattedDate,
    time,
    itemsToRecycle: itemNames,
    remarks,
  };

  return bookingSummary;
}
