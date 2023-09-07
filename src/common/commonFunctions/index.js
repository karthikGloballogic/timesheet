export const validateData = (hourData = []) => {
  if (hourData?.length === 0) {
    alert("At least one time card must be filled.");
    return false;
  }

  for (const timeCard of hourData) {
    if (timeCard?.totalHoursLogged > 0) {
      if (!timeCard?.projectCode || !timeCard?.jobCode) {
        alert("Project code and job code must be provided for entries");
        return false;
      }
    } else {
      alert("Please log the hours for the project", timeCard.projectCode);
      return false;
    }
  }

  return true;
};

export const getTotalHours = (totalHours = []) => {
  if (totalHours) {
    return totalHours.reduce((acc, val) => acc + val, 0);
  }
  return 0;
};

export const getDisplayTypeForFilledData = (
  isFilledDataAvailable = [],
  status,
  returnType = "string"
) => {
  if (isFilledDataAvailable.length > 0 && status !== "rejected") {
    return returnType === "string" ? "none" : true;
  }
  return returnType === "string" ? "" : false;
};
