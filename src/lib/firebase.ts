import { db } from "@/configs/firebaseConfigs";
import { FIREBASE_COLLECTION } from "@/types/firebase";
import { TRegistrationData } from "@/types/form";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { getLastWeekStartAndEndDate, getStartAndEndDateOfThisWeek } from "./utils";

export async function getRegistrations () {
  let registrationsRef = collection(db, FIREBASE_COLLECTION.REGISTRATION);
  const q = query(registrationsRef, orderBy("registrationDate", "desc"));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      userId: doc.id,
      registrationDate: doc.data().registrationDateString,
      name: doc.data().name,
      introducer: doc.data().introducer,
      gender: doc.data().gender,
      marriageStatus: doc.data().marriageStatus,
      birthday: doc.data().birthday,
      phoneNumber: doc.data().phoneNumber,
      faithExperience: doc.data().faithExperience,
      postcode: doc.data().postcode,
      address: doc.data().fullAddress,
      profileUrl: doc.data().profileUrl,
    };
  });
}

export async function getWeeklyRegistrations (startDate: Date, endDate: Date) {
  let registrationsRef = collection(db, FIREBASE_COLLECTION.REGISTRATION);
  const q = query(registrationsRef, where("registrationDate", ">=", startDate), where("registrationDate", "<=", endDate));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      userId: doc.id,
      registrationDate: doc.data().registrationDateString,
      name: doc.data().name,
      introducer: doc.data().introducer,
      gender: doc.data().gender,
      marriageStatus: doc.data().marriageStatus,
      birthday: doc.data().birthday,
      phoneNumber: doc.data().phoneNumber,
      faithExperience: doc.data().faithExperience,
      postcode: doc.data().postcode,
      address: doc.data().fullAddress,
      profileUrl: doc.data().profileUrl,
    };
  });
}

export async function getMonthlyRegistrations (thisYear: string, thisMonth: string) {
  let registrationsRef = collection(db, FIREBASE_COLLECTION.REGISTRATION);
  const q = query(registrationsRef, where("yearOfRegistration", "==", thisYear), where("monthOfRegistration", "==", thisMonth));
  
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      userId: doc.id,
      registrationDate: doc.data().registrationDateString,
      name: doc.data().name,
      introducer: doc.data().introducer,
      gender: doc.data().gender,
      marriageStatus: doc.data().marriageStatus,
      birthday: doc.data().birthday,
      phoneNumber: doc.data().phoneNumber,
      faithExperience: doc.data().faithExperience,
      postcode: doc.data().postcode,
      address: doc.data().fullAddress,
      profileUrl: doc.data().profileUrl,
    };
  });
}

export async function getUserById (userId: string) {
  const docRef = doc(db, FIREBASE_COLLECTION.REGISTRATION, userId);
  const result = await getDoc(docRef);
  
  if (result.exists()) {
    const data = result.data()
    return {
      userId: result.id,
      registrationDate: data.registrationDateString,
      name: data.name,
      introducer: data.introducer,
      gender: data.gender,
      marriageStatus: data.marriageStatus,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,
      faithExperience: data.faithExperience,
      postcode: data.postcode,
      address: data.fullAddress,
      profileUrl: data.profileUrl,
    }
  }
}

export const createRegistrtaion = async (registerForm: TRegistrationData) => {
  return await addDoc(collection(db, FIREBASE_COLLECTION.REGISTRATION), registerForm);
}

export const deleteRegistration = async (userId: string) => {
  const docRef = doc(db, FIREBASE_COLLECTION.REGISTRATION, userId);
  return await deleteDoc(docRef)
}

export async function getRegistrantsStatistics (thisYear: string, thisMonth: string) {
  const { startDate, endDate } = getStartAndEndDateOfThisWeek()
  const { lastWeekStartDate, lastWeekEndDate } = getLastWeekStartAndEndDate()
  let registrationsRef = collection(db, FIREBASE_COLLECTION.REGISTRATION);
  const thisweekQuery = query(registrationsRef, where("registrationDate", ">=", startDate), where("registrationDate", "<=", endDate));
  const lastweekQuery = query(registrationsRef, where("registrationDate", ">=", lastWeekStartDate), where("registrationDate", "<=", lastWeekEndDate));
  const monthlyQuery = query(registrationsRef, where("yearOfRegistration", "==", thisYear), where("monthOfRegistration", "==", thisMonth));
  const yearlyQuery = query(registrationsRef, where("yearOfRegistration", "==", thisYear));

  const thisWeekResults = await getDocs(thisweekQuery);
  const lastWeekResults = await getDocs(lastweekQuery);
  const monthlyResults = await getDocs(monthlyQuery);
  const yearlyResults = await getDocs(yearlyQuery);
  
  return {
    thisWeekRegistrationSize: thisWeekResults.size,
    lastWeekRegistrationSize: lastWeekResults.size,
    monthylRegistrationSize: monthlyResults.size,
    weeklyAverage: Math.ceil(monthlyResults.size / 4),
    yearlyRegistrationSize: yearlyResults.size,
    monthlyAverage: Math.ceil(monthlyResults.size / 12),
  }
  
}

// function applyQueryFilters(q, { category, city, price, sort }) {
//   if (category) {
//           q = query(q, where("category", "==", category));
//   }
//   if (city) {
//           q = query(q, where("city", "==", city));
//   }
//   if (price) {
//           q = query(q, where("price", "==", price.length));
//   }
//   if (sort === "Rating" || !sort) {
//           q = query(q, orderBy("avgRating", "desc"));
//   } else if (sort === "Review") {
//           q = query(q, orderBy("numRatings", "desc"));
//   }
//   return q;
// }