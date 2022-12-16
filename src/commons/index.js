function getUserId() {
  let userId = window.localStorage.getItem("userId");
  return userId;
}

export function setAuthToken(token, id) {
  if (token) {
    window.localStorage.setItem("token", token);
  }
  if (id) {
    window.localStorage.setItem("userId", id);
  }
}
export function resetAuthToken() {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userId')
  window.localStorage.removeItem('guest_mode')
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function clearNumber(value = '') {
  return value.replace(/\D+/g, '')
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value)

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
  }
  return clearValue
}

export function variableValidator(
  variable,
  typeCheck = "string",
  checkEmpty = false
) {
  let validated = variable !== undefined && variable !== null;
  if (typeCheck === "string") {
    validated = validated && variable !== "";
  }
  if (typeCheck === "object") {
    validated = validated && typeof variable === "object";
    if (checkEmpty === true) {
      validated = validated && Object.keys(variable).length > 0;
    }
  }
  if (typeCheck === "array") {
    validated = validated && Array.isArray(variable);
    if (checkEmpty === true) {
      validated = validated && variable.length > 0;
    }
  }
  if (typeCheck === "bool") {
    if (checkEmpty === true) {
      validated = validated !== "";
    }
  }
  return validated;
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const imageExtensions = ["png", "jpeg", "jpg", "gif", "svg"];

export function creditCardType(cc) {
  let amex = new RegExp('^3[47][0-9]{13}$');
  let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  let mastercard = new RegExp('^5[1-5][0-9]{14}$');
  let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

  let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
  let jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  let rupay = new RegExp('^6(?!011)(?:0[0-9]{14}|52[12][0-9]{12})');

  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup1.test(cc) || cup2.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  if (rupay.test(cc)) {
    return 'RUPAY';
  }
  return undefined;
}

export default getUserId;
