export const PARCELS = [
  {
    id: "B3",
    name: "Парцела Б3",
    crop: "Пченица",
    location: "Кривогаштани",
    area: "3.8 ха",
    lastDate: "22.03.2026",
    status: "urgent",
    color: "yellow",
    icon: "🌾",
  },
  {
    id: "A1",
    name: "Парцела А1",
    crop: "Домати",
    location: "Гевгелија",
    area: "4.8 ха",
    lastDate: "24.03.2026",
    status: "ok",
    color: "red",
    icon: "🍅",
  },
  {
    id: "B1",
    name: "Парцела В1",
    crop: "Морков",
    location: "Ново Село",
    area: "3.2 ха",
    lastDate: "23.03.2026",
    status: "today",
    color: "orange",
    icon: "🥕",
  },
];

export const HISTORY = [
  {
    date: "24.03.2026",
    qty: "15 000 л",
    method: "Спринклер",
    duration: "2ч 20мин",
    done: true,
  },
  {
    date: "20.03.2026",
    qty: "14 500 л",
    method: "Спринклер",
    duration: "2ч 20мин",
    done: false,
  },
];

export const CHART_BARS = [
  { label: "Пон", real: 40, plan: 55 },
  { label: "Вто", real: 60, plan: 65 },
  { label: "Сре", real: 30, plan: 45 },
  { label: "Чет", real: 75, plan: 70 },
  { label: "Пет", real: 55, plan: 60 },
  { label: "Саб", real: 80, plan: 75 },
  { label: "Нед", real: 50, plan: 55 },
];
