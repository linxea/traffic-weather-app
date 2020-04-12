const SESSION_STORAGE_COORDINATES_KEY = "coordinatesMapping";

const getSessionStorageState = (key) => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveSessionStorageState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch {
    // Log error
  }
};

export const getCoordinatesToLocationNameMappingFromSessionStorage = () => {
  let coordinatesList = getSessionStorageState(SESSION_STORAGE_COORDINATES_KEY);

  if (!coordinatesList) {
    coordinatesList = [];
    saveSessionStorageState(SESSION_STORAGE_COORDINATES_KEY, coordinatesList);
  }

  return coordinatesList;
};

export const setCoordinatesToLocationNameMappingFromSessionStorage = (
  coordinatesList
) => {
  saveSessionStorageState(SESSION_STORAGE_COORDINATES_KEY, coordinatesList);
};
