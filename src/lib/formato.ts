export const formatoPrecio = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
});

export const formatoFecha = new Intl.DateTimeFormat("es-DO", {
  dateStyle: "medium",
  timeStyle: "short",
});
