import { fakeImgs } from "./fakeImgs";

export const fakeGetAllBookingResponse = {
  status: 200,
  error_message: null,
  headers: {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "0",
    "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "X-Frame-Options": "DENY",
  },
  content_type: "application/json",
  body: [
    {
      bookingId: "f0b21799-3183-4c1f-abc3-b64cc209e880",
      userId: "41a06866-04c8-44db-bf18-8446064c286a",
      bookingDateTime: "2024-11-30T14:30:00",
      appointmentDateTime: "2024-11-30T14:30:00",
      location: {
        locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
        locationName: "Fitzroy",
        locationAddress: "104 Cecil Street",
        latitude: 1.281285,
        longitude: 103.848961,
        createdAt: "2024-10-20T21:29:29.820765",
        updatedAt: "2024-10-20T21:29:29.820816",
      },
      collectionType: "HOME",
      paymentMethod: "VISA",
      remarks: "The television is working, model Samsung UTA11209C.",
      createdAt: null,
      updatedAt: "2024-11-19T21:52:27.149267",
      locationSameAsRegistered: true,
    },
    {
      bookingId: "0d1a70ce-54db-440a-98d8-46550a6fb4a9",
      userId: "41a06866-04c8-44db-bf18-8446064c286a",
      bookingDateTime: "2025-01-26T14:30:00",
      appointmentDateTime: "2025-01-26T14:30:00",
      location: {
        locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
        locationName: "Fitzroy",
        locationAddress: "104 Cecil Street",
        latitude: 1.281285,
        longitude: 103.848961,
        createdAt: "2024-10-20T21:29:29.820765",
        updatedAt: "2024-10-20T21:29:29.820816",
      },
      collectionType: "HOME",
      paymentMethod: "VISA",
      remarks: "Chinese New Year cleaning",
      createdAt: null,
      updatedAt: "2024-11-19T21:52:28.582282",
      locationSameAsRegistered: true,
    },
    {
      bookingId: "c6e9a7ba-28aa-4adc-81e0-f6d0f303666f",
      userId: "41a06866-04c8-44db-bf18-8446064c286a",
      bookingDateTime: "2024-09-25T14:30:00",
      appointmentDateTime: "2024-09-25T14:30:00",
      location: {
        locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
        locationName: "Fitzroy",
        locationAddress: "104 Cecil Street",
        latitude: 1.281285,
        longitude: 103.848961,
        createdAt: "2024-11-19T21:29:29.820765",
        updatedAt: "2024-11-19T21:29:29.820816",
      },
      collectionType: "HOME",
      paymentMethod: "VISA",
      remarks: "Spoilt Tv and Recyclable Books",
      createdAt: null,
      updatedAt: "2024-11-19T21:52:27.149267",
      locationSameAsRegistered: true,
    },
  ],
  forwarded_url: null,
  redirected_url: null,
  cookies: [],
};

export function fakeGetAllItemFromBookingResponse(fakeBookingId) {
  switch (fakeBookingId) {
    case "f0b21799-3183-4c1f-abc3-b64cc209e880":
      return {
        status: 200,
        error_message: null,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "0",
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "X-Frame-Options": "DENY",
        },
        content_type: "application/json",
        body: [
          {
            itemId: "a4977c80-63bf-4f45-a76a-61d85aaafd59",
            itemName: "Television",
            itemDescription: "Television",
            createdAt: null,
            updatedAt: "2024-11-19",
            booking: {
              bookingId: "f0b21799-3183-4c1f-abc3-b64cc209e880",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2024-11-30T14:30:00",
              appointmentDateTime: "2024-11-30T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-10-20T21:29:29.820765",
                updatedAt: "2024-10-20T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "The television is working, model Samsung UTA11209C.",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:27.149267",
              locationSameAsRegistered: true,
            },
          },
          {
            itemId: "13d5f53b-5f89-4977-baa8-f79d7deb0682",
            itemName: "Paper",
            itemDescription: "Paper",
            createdAt: null,
            updatedAt: "2024-11-19",
            booking: {
              bookingId: "f0b21799-3183-4c1f-abc3-b64cc209e880",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2024-11-30T14:30:00",
              appointmentDateTime: "2024-11-30T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-10-20T21:29:29.820765",
                updatedAt: "2024-10-20T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "The television is working, model Samsung UTA11209C.",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:27.149267",
              locationSameAsRegistered: true,
            },
          },
        ],
        forwarded_url: null,
        redirected_url: null,
        cookies: [],
      };
    case "0d1a70ce-54db-440a-98d8-46550a6fb4a9":
      return {
        status: 200,
        error_message: null,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "0",
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "X-Frame-Options": "DENY",
        },
        content_type: "application/json",
        body: [
          {
            itemId: "da746e6e-721d-40af-bac3-df2c49828b16",
            itemName: "Cans",
            itemDescription: "Cans",
            createdAt: null,
            updatedAt: "2024-11-19",
            booking: {
              bookingId: "0d1a70ce-54db-440a-98d8-46550a6fb4a9",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2025-01-26T14:30:00",
              appointmentDateTime: "2025-01-26T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-10-20T21:29:29.820765",
                updatedAt: "2024-10-20T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "Chinese New Year cleaning",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:28.582282",
              locationSameAsRegistered: true,
            },
          },
          {
            itemId: "64c8ce03-b091-4fea-a4c5-5f4b5f48d222",
            itemName: "Newspaper",
            itemDescription: "Newspaper",
            createdAt: null,
            updatedAt: "2024-11-19",
            booking: {
              bookingId: "0d1a70ce-54db-440a-98d8-46550a6fb4a9",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2025-01-26T14:30:00",
              appointmentDateTime: "2025-01-26T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-10-20T21:29:29.820765",
                updatedAt: "2024-10-20T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "Chinese New Year cleaning",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:28.582282",
              locationSameAsRegistered: true,
            },
          },
        ],
        forwarded_url: null,
        redirected_url: null,
        cookies: [],
      };
    case "c6e9a7ba-28aa-4adc-81e0-f6d0f303666f":
      return {
        status: 200,
        error_message: null,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-XSS-Protection": "0",
          "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "X-Frame-Options": "DENY",
        },
        content_type: "application/json",
        body: [
          {
            itemId: "14245ba8-939e-41a2-9282-201e9b11e5f6",
            itemName: "Television",
            itemDescription: "Television",
            createdAt: null,
            updatedAt: "2024-11-20",
            booking: {
              bookingId: "c6e9a7ba-28aa-4adc-81e0-f6d0f303666f",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2024-09-25T14:30:00",
              appointmentDateTime: "2024-09-25T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-11-19T21:29:29.820765",
                updatedAt: "2024-11-19T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "Spoilt Tv and Recyclable Books",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:27.149267",
              locationSameAsRegistered: true,
            },
          },
          {
            itemId: "0e81f4bc-410f-42cc-96b2-e433becdc33b",
            itemName: "Books",
            itemDescription: "Books",
            createdAt: null,
            updatedAt: "2024-11-20",
            booking: {
              bookingId: "c6e9a7ba-28aa-4adc-81e0-f6d0f303666f",
              userId: "41a06866-04c8-44db-bf18-8446064c286a",
              bookingDateTime: "2024-09-25T14:30:00",
              appointmentDateTime: "2024-09-25T14:30:00",
              location: {
                locationId: "5518d3d2-e861-4d65-b116-a19bc2adfd7c",
                locationName: "Fitzroy",
                locationAddress: "104 Cecil Street",
                latitude: 1.281285,
                longitude: 103.848961,
                createdAt: "2024-11-19T21:29:29.820765",
                updatedAt: "2024-11-19T21:29:29.820816",
              },
              collectionType: "HOME",
              paymentMethod: "VISA",
              remarks: "Spoilt Tv and Recyclable Books",
              createdAt: null,
              updatedAt: "2024-11-19T21:52:27.149267",
              locationSameAsRegistered: true,
            },
          },
        ],
        forwarded_url: null,
        redirected_url: null,
        cookies: [],
      };
    default:
      return "";
  }
}

export function fakeGetAllImageFromItemResponse(fakeItemId) {
  switch (fakeItemId) {
    case "a4977c80-63bf-4f45-a76a-61d85aaafd59":
      return fakeImgs.television;
    case "13d5f53b-5f89-4977-baa8-f79d7deb0682":
      return fakeImgs.paperRelated;
    case "da746e6e-721d-40af-bac3-df2c49828b16":
      return fakeImgs.cans;
    case "64c8ce03-b091-4fea-a4c5-5f4b5f48d222":
      return fakeImgs.newspaper;
    case "14245ba8-939e-41a2-9282-201e9b11e5f6":
      return fakeImgs.television;
    case "0e81f4bc-410f-42cc-96b2-e433becdc33b":
      return fakeImgs.books;
    default:
      return fakeImgs.carton;
  }
}
