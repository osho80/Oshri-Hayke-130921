import { compose } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface City {
  AdministrativeArea: any;
  Country: { ID: string; LocalizedName: string };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
}

export interface DailyForecast {
  Date: string;
  Day: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  Sources: string[];
  Temperature: {
    Maximum: { Unit: string; UnitType: number; Value: number };
    Minimum: { Unit: string; UnitType: number; Value: number };
  };
}

export interface CurrentConditions {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  isDayTime: boolean;
  Temperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number; Unit: string; UnitType: number };
  };
  Link: string;
  MobileLink: string;
}

export interface CityProps {
  id: string;
  name: string;
}
