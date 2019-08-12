export const USER_TYPE = {
  USER: 'USER',
  GUEST: 'GUEST',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER'
}

export const PAGE_TYPE = {
  HOME: 'HOME',
  MEMBERSHIP: 'MEMBERSHIP',
  SUMMARY: 'SUMMARY',
};

export const BOARD_TYPE = {
  MEETING: 'MEETING',
  NOTICE: 'NOTICE',
  EVENT: 'EVENT',
  DISCUSSION: 'DISCUSSION',
};

export const BOARD_USERS = {
  MEETING: [USER_TYPE.ADMIN, USER_TYPE.OWNER],
  NOTICE: [USER_TYPE.ADMIN, USER_TYPE.OWNER],
  EVENT: [USER_TYPE.ADMIN, USER_TYPE.OWNER],
  DISCUSSION: [USER_TYPE.ADMIN, USER_TYPE.OWNER, USER_TYPE.USER],
}


export const BOARD_PROPERTY = {
  PAGE_SIZE: 10,
  PAGINATION_SIZE: 5,
};

export const MEMBER_PROPERTY = {
  PAGE_SIZE: 10,
  PAGINATION_SIZE: 4
};

export const BADGE_MARK_DAYS = 5;

export const CITIES_IN_BC = [
  "Abbotsford", "Burnaby", "Chilliwack",
  "Coquitlam",
  "Delta", "Kamloops",
  "Langley", "Maple Ridge", "Mission",
  "Nanaimo", "New Westminster",
  "North Vancouver", "Penticton", "Port Alberni", "Port Hardy", "Port Moody",
  "Richmond", "Surrey",
  "Vancouver", "Victoria", "Whistler"];


export const PROVINCE_AND_CITIES_IN_CANADA = {
  'Alberta': ["Airdrie", "Beaumont", "Bonnyville", "Brazeau", "Breton", "Calgary", "Camrose", "Canmore", "Didzbury", "Drayton Valley", "Edmonton", "Ft. Saskatchewan", "Grande Prairie", "Hanna", "Hinton", "Irricana", "Lacombe", "Leduc", "Lethbridge", "McLennan", "Medicine Hat", "Olds", "Onoway", "Provost", "Red Deer", "Spruce Grove", "St. Albert", "Strathcona County", "Strathmore", "Swan Hills", "Sylvan Lake", "Taber", "Turner Valley", "Vermillion", "Wood Buffalo"],
  'British Columbia': ["Armstrong", "Abbotsford", "Burnaby", "Cache Creek", "Castlegar", "Chemainus", "Chilliwack", "Clearwater", "Colwood", "Coquitlam", "Cranbrook", "Dawson Creek", "Delta", "Fernie", "Invermere", "Kamloops", "Kaslo", "Langley", "Lumby", "Maple Ridge", "Merritt", "Mission", "Nanaimo", "Nelson", "New Westminster", "North Cowichan", "North Vancouver", "Osoyoos", "Parksville", "Peace River", "Penticton", "Port Alberni", "Port Hardy", "Port Moody", "Prince George", "Prince Rupert", "Richmond", "Saanich", "Sooke", "Sparwood", "Surrey", "Terrace", "Tumbler", "Vancouver", "Vernon", "Victoria", "Whistler"],
  "Manitoba": ["Birtle", "Brandon", "Cranberry Portage", "Dauphin", "Flin Flon", "Snow Lake", "Steinbach", "Stonewall", "Swan River", "The Pas", "Thompson", "Winnipeg"],
  "New Brunswick": ["Cap-Pele", "Fredericton", "Grand Bay-Westfield", "Grand Falls", "Memramcook", "Miramichi", "Moncton", "Oromocto", "Port Elgin", "Sackville", "Saint John", "Saint Stephen", "Shippagan", "Sussex", "Tracadie-Sheila"],
  "Newfoundland And Labrador": ["Argentia", "Bishop's Falls", "Botwood", "Brigus", "Corner Brook", "Labrador City", "Mount Pearl", "Paradise", "Portaux Basques", "St. John's"],
  "Northwest Territories": ["Town of Hay River", "Town of Inuvik", "Yellowknife"],
  "Nova Scotia": ["Amherst", "Annapolis", "Argyle", "Baddeck", "Bridgewater", "Cape Breton", "Chester", "County of Kings", "Cumberland County", "East Hants", "Halifax", "Hants County", "Inverness County", "Kentville", "Lunenburg County", "Lunenburg", "Mahone Bay", "New Glasgow", "New Minas", "Parrsboro", "Pictou County", "Pictou", "Queens", "Richmond", "Shelburne", "Stellarton", "Truro", "Windsor", "Yarmouth"],
  "Ontario": ["Ajax", "Atikokan", "Barrie", "Belleville", "Blandford-Blenheim", "Blind River", "Brampton", "Brant", "Brantford", "Brock", "Brockville", "Burlington", "Caledon", "Cambridge", "Chatham-Kent", "Chesterville", "Clarington", "Cobourg", "Cochrane", "Collingwood", "Cornwall", "Cumberland", "Deep River", "Dundas", "Durham", "Dymond", "Ear Falls", "East Gwillimbury", "East Zorra-Tavistock", "Elgin", "Elliot Lake", "Flamborough", "Fort Erie", "Fort Frances", "Gananoque", "Georgina", "Glanbrook", "Gloucester", "Goulbourn", "Gravenhurst", "Grimsby", "Guelph", "Haldimand-Norfork", "Halton Hills", "Halton", "Hamilton", "Hamilton-Wentworth", "Hearst", "Huntsville", "Ingersoll", "James", "Kanata", "Kincardine", "King", "Kingston", "Kirkland Lake", "Kitchener", "Larder Lake", "Leamington", "Lennox-Addington", "Lincoln", "Lindsay", "London", "Loyalist Township", "Markham", "Merrickville", "Metro Toronto", "Milton", "Nepean", "Newmarket", "Niagara Falls", "Niagara", "Niagara-on-the-Lake", "North Bay", "North Dorchester", "North Dumfries", "North York", "Norwich", "Oakville", "Orangeville", "Orillia", "Osgoode", "Oshawa", "Ottawa", "Ottawa-Carleton", "Owen Sound", "Peterborough", "Pickering", "Port Bruce", "Port Burwell", "Port Colborne", "Port Hope", "Prince Edward", "Quinte West", "Renfrew", "Richmond Hill", "Sarnia", "Sault Ste. Marie", "Scarborough", "Scugog", "Smiths Falls", "Souix Lookout CoC Sioux Lookout", "South-West Oxford", "St. Catharines", "St. Thomas", "Stoney Creek", "Stratford", "Sudbury", "Temagami", "Thorold", "Thunder Bay", "Tillsonburg", "Timmins", "Toronto", "Uxbridge", "Vaughan", "Wainfleet", "Wasaga Beach", "Waterloo", "Welland", "Wellesley", "West Carleton", "West Lincoln", "Whitby", "Wilmot", "Windsor", "Woolwich", "York"],
  "Prince Edward Island": ["Alberton", "Charlottetown", "Cornwall", "Montague", "Souris", "Stratford", "Summerside"],
  "Quebec": ["Alma", "Amos", "Anjou", "Aylmer", "Beauport", "Bromptonville", "Brosssard", "Chateauguay", "Chicoutimi", "Coaticook", "Dorval", "Drummondville", "Fleurimont", "Gaspe", "Gatineau", "Hull", "Joliette", "Jonquiere", "Lachine", "Lasalle", "Laurentides", "Laval", "Lennoxville", "Levis", "Longueuil", "Marieville", "Montreal Region", "Montreal", "Montreal-Est", "Mount Royal", "Quebec", "Saint-Leonard", "Sherbrooke", "Sorel", "Thetford Mines", "Victoriaville"],
  "Saskatchewan": ["Avonlea", "Colonsay", "Craik", "Creighton", "Eastend", "Esterhazy", "Gravelbourg", "Melfort", "Nipawin", "Prince Albert", "Regina", "Saskatoon", "Shell Lake", "Swift Current", "Tisdale", "Unity", "Weyburn", "Wynyard", "Yorkton"],
  "Yukon": ["Carcross", "Whitehorse"]
}


export const PROVINCES_IN_CANADA = [
  'AB', 'BC', 'MB',
  'NB', 'NL',
  'NT', 'NS',
  'NV', 'ON', 'PE',
  'QC', 'SK', 'YT'];


export const JUMBOTRON_BG_COMMON = "rgba(255,255,255,0.75)"


export const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
export const POSTAL_CODE_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
export const YEAR_REGEX = /^\d{4}$/;
export const MONTH_REGEX = /^(0?[1-9]|1[012])$/;


export const API = {
  BASE: 'http://localhost:4000',
  SIGN_UP: 'http://localhost:4000/auth/signup',
  SIGN_IN: 'http://localhost:4000/auth/signin',
  SIGN_OUT: 'http://localhost:4000/auth/signout',

  GET_USER: 'http://localhost:4000/user/get',
 
  GET_POST: `http://localhost:4000/post/`,
  GET_HEADER: `http://localhost:4000/post/recent`,
  GET_POST2: `http://localhost:4000/post/`,
  CREATE_POST: `http://localhost:4000/post/create`,
  UPDATE_POST: `http://localhost:4000/post/update`,
  DELETE_POST: `http://localhost:4000/post/delete`,

  GET_USERS: `http://localhost:4000/user/`,
  UPDATE_USER: `http://localhost:4000/user/update`,
  DELETE_USER: `http://localhost:4000/user/delete`,
  
  GET_PAGE: `http://localhost:4000/page/get`,
  CREATE_PAGE: `http://localhost:4000/page/create`,
  UPDATE_PAGE: `http://localhost:4000/page/update`,
  DELETE_PAGE: `http://localhost:4000/page/delete`,

  GET_COMMENT: `http://localhost:4000/comment/`,
  CREATE_COMMENT: `http://localhost:4000/comment/create`,
  UPDATE_COMMENT: `http://localhost:4000/comment/update`,
  DELETE_COMMENT: `http://localhost:4000/comment/delete`,

  GET_HISTORY: `http://localhost:4000/history/all`,
  CREATE_HISTORY: `http://localhost:4000/history/create`,
  UPDATE_HISTORY: `http://localhost:4000/history/update`,
  DELETE_HISTORY: `http://localhost:4000/history/delete`,

}