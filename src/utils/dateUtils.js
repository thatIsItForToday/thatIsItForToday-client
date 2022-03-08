import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const getToday = () => {
  const date = new Date();
  const ISO = date.toISOString();

  return format(parseISO(ISO), "PPP", { locale: enUS });
};

export { getToday };
