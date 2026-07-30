import type { Locale, Meal, NutritionPlan, SubstitutionGroup } from "./types";

const mealNameMap: Record<Locale, Record<string, string>> = {
  ar: {
    breakfast: "إفطار",
    snack: "سناك",
    lunch: "غداء",
    preWorkout: "قبل التمرين",
    postWorkout: "بعد التمرين",
    dinner: "عشاء",
    beforeSleep: "قبل النوم",
  },
  en: {
    breakfast: "Breakfast",
    snack: "Snack",
    lunch: "Lunch",
    preWorkout: "Pre-Workout",
    postWorkout: "Post-Workout",
    dinner: "Dinner",
    beforeSleep: "Before Sleep",
  },
  ru: {
    breakfast: "Завтрак",
    snack: "Перекус",
    lunch: "Обед",
    preWorkout: "До тренировки",
    postWorkout: "После тренировки",
    dinner: "Ужин",
    beforeSleep: "Перед сном",
  },
};

const phraseMap: Record<Locale, Array<[string, string]>> = {
  ar: [
    ["whole eggs", "بيض كامل"],
    ["egg whites", "بياض البيض"],
    ["oats", "شوفان"],
    ["milk", "حليب"],
    ["skimmed milk", "لبن خالي الدسم"],
    ["mixed vegetables", "خضار مشكلة"],
    ["vegetables", "خضار"],
    ["cucumber & tomato", "خيار وطماطم"],
    ["Greek yogurt", "زبادي يوناني"],
    ["light Greek yogurt", "زبادي يوناني خفيف"],
    ["almonds", "لوز"],
    ["walnuts", "مكسرات جوز"],
    ["pistachios", "فستق"],
    ["peanuts", "فول سوداني"],
    ["roasted chickpeas", "حمص محمص"],
    ["chicken breast", "صدر دجاج"],
    ["grilled chicken breast", "صدر دجاج مشوي"],
    ["grilled chicken", "دجاج مشوي"],
    ["lean beef", "لحم بقر قليل الدسم"],
    ["lean red meat", "لحم أحمر قليل الدسم"],
    ["beef", "لحم بقر"],
    ["red meat", "لحم أحمر"],
    ["tuna", "تونة"],
    ["drained tuna", "تونة مصفاة"],
    ["white fish", "سمك أبيض"],
    ["grilled fish", "سمك مشوي"],
    ["fish", "سمك"],
    ["shrimp", "جمبري"],
    ["cottage cheese", "جبنة قريش"],
    ["cooked rice", "أرز مطبوخ"],
    ["rice", "أرز"],
    ["boiled potatoes", "بطاطس مسلوقة"],
    ["potatoes", "بطاطس"],
    ["boiled pasta", "مكرونة مسلوقة"],
    ["cooked pasta", "مكرونة مطبوخة"],
    ["pasta", "مكرونة"],
    ["olive oil", "زيت زيتون"],
    ["banana", "موز"],
    ["brown toast", "توست بني"],
    ["whole wheat bread", "خبز قمح كامل"],
    ["whole wheat toast", "توست قمح كامل"],
    ["rice cakes", "رقائق أرز"],
    ["dates", "تمر"],
    ["apple", "تفاح"],
    ["orange", "برتقال"],
    ["grapes", "عنب"],
    ["salad", "سلطة"],
    ["mixed salad", "سلطة مشكلة"],
    ["grilled", "مشوي"],
    ["boiled", "مسلوق"],
    ["canned", "معلب"],
    ["drained", "مصفى"],
    ["light", "خفيف"],
    ["whole", "كامل"],
    ["cooked", "مطفى"],
    ["raw", "خام"],
    ["meat", "لحم"],
    ["meats", "لحوم"],
    ["carbs", "نشويات"],
    ["protein", "بروتين"],
    ["fat", "دهون"],
    ["calories", "سعرات"],
    ["water", "مياه"],
    ["training", "تدريب"],
    ["day", "يوم"],
    ["days", "أيام"],
    ["rest", "راحة"],
    ["optional", "اختياري"],
    ["protein swaps", "بدائل البروتين"],
    ["carb swaps", "بدائل النشويات"],
    ["fat swaps", "بدائل الدهون"],
    ["snack nuts", "مكسرات السناك"],
    ["pre-workout fruit", "فاكهة قبل التمرين"],
    ["pre-workout carbs", "نشويات قبل التمرين"],
    ["cutting", "تنشيف"],
    ["female cutting", "تنشيف نسائي"],
    ["training days", "أيام تدريب"],
    ["rest days", "أيام راحة"],
    ["weigh", "وزن"],
    ["after cooking", "بعد الطهي"],
    ["without sugar", "بدون سكر"],
    ["allowed", "مسموح"],
    ["coffee", "قهوة"],
    ["tea", "شاي"],
    ["drink", "اشرب"],
    ["daily", "يومياً"],
    ["track", "تابع"],
    ["body", "الجسم"],
    ["weight", "الوزن"],
    ["waist", "الخصر"],
    ["measurement", "القياس"],
    ["energy", "الطاقة"],
    ["progress", "التقدم"],
  ],
  en: [],
  ru: [
    ["whole eggs", "целые яйца"],
    ["egg whites", "белки яиц"],
    ["oats", "овсянка"],
    ["milk", "молоко"],
    ["skimmed milk", "обезжиренное молоко"],
    ["mixed vegetables", "смешанные овощи"],
    ["vegetables", "овощи"],
    ["cucumber & tomato", "огурец и томат"],
    ["Greek yogurt", "греческий йогурт"],
    ["light Greek yogurt", "лёгкий греческий йогурт"],
    ["almonds", "миндаль"],
    ["walnuts", "грецкие орехи"],
    ["pistachios", "фисташки"],
    ["peanuts", "арахис"],
    ["roasted chickpeas", "жареный нут"],
    ["chicken breast", "куриная грудка"],
    ["grilled chicken breast", "куриная грудка на гриле"],
    ["grilled chicken", "курица на гриле"],
    ["lean beef", "постная говядина"],
    ["lean red meat", "постное красное мясо"],
    ["beef", "говядина"],
    ["red meat", "красное мясо"],
    ["tuna", "тунец"],
    ["drained tuna", "тунца без жидкости"],
    ["white fish", "белая рыба"],
    ["grilled fish", "рыба на гриле"],
    ["fish", "рыба"],
    ["shrimp", "креветки"],
    ["cottage cheese", "творог"],
    ["cooked rice", "варёный рис"],
    ["rice", "рис"],
    ["boiled potatoes", "варёный картофель"],
    ["potatoes", "картофель"],
    ["boiled pasta", "варёная паста"],
    ["cooked pasta", "варёная паста"],
    ["pasta", "паста"],
    ["olive oil", "оливковое масло"],
    ["banana", "банан"],
    ["brown toast", "цельнозерновой тост"],
    ["whole wheat bread", "цельнозерновой хлеб"],
    ["whole wheat toast", "цельнозерновой тост"],
    ["rice cakes", "рисовые хлебцы"],
    ["dates", "финики"],
    ["apple", "яблоко"],
    ["orange", "апельсин"],
    ["grapes", "виноград"],
    ["salad", "салат"],
    ["mixed salad", "салат из овощей"],
    ["grilled", "на гриле"],
    ["boiled", "варёный"],
    ["canned", "консервированный"],
    ["drained", "без жидкости"],
    ["light", "лёгкий"],
    ["whole", "цельный"],
    ["cooked", "варёный"],
    ["raw", "сырой"],
    ["meat", "мясо"],
    ["meats", "мясо"],
    ["carbs", "углеводы"],
    ["protein", "белок"],
    ["fat", "жиры"],
    ["calories", "калории"],
    ["water", "вода"],
    ["training", "тренировки"],
    ["day", "день"],
    ["days", "дни"],
    ["rest", "отдых"],
    ["optional", "по желанию"],
    ["protein swaps", "замены белка"],
    ["carb swaps", "замены углеводов"],
    ["fat swaps", "замены жиров"],
    ["snack nuts", "орехи для перекуса"],
    ["pre-workout fruit", "фрукты до тренировки"],
    ["pre-workout carbs", "углеводы до тренировки"],
    ["cutting", "сушка"],
    ["female cutting", "женская сушка"],
    ["training days", "дни тренировок"],
    ["rest days", "дни отдыха"],
    ["weigh", "взвешивайте"],
    ["after cooking", "после приготовления"],
    ["without sugar", "без сахара"],
    ["allowed", "разрешено"],
    ["coffee", "кофе"],
    ["tea", "чай"],
    ["drink", "пейте"],
    ["daily", "ежедневно"],
    ["track", "отслеживайте"],
    ["body", "тело"],
    ["weight", "вес"],
    ["waist", "талия"],
    ["measurement", "измерение"],
    ["energy", "энергию"],
    ["progress", "прогресс"],
  ],
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function translateText(value: string, locale: Locale): string {
  if (!value || locale === "en") return value;
  let text = value;
  const replacements = phraseMap[locale];
  for (const [from, to] of replacements) {
    const regex = new RegExp(`\\b${escapeRegExp(from)}\\b`, "gi");
    text = text.replace(regex, to);
  }
  return text;
}

function translateMeal(meal: Meal, locale: Locale): Meal {
  return {
    ...meal,
    name: mealNameMap[locale]?.[meal.id] ?? meal.name,
    ingredients: translateText(meal.ingredients ?? "", locale),
    grams: meal.grams ? translateText(meal.grams, locale) : meal.grams,
    alternatives: meal.alternatives?.map((item) => translateText(item, locale)),
  };
}

function translateSubstitution(item: SubstitutionGroup, locale: Locale): SubstitutionGroup {
  return {
    ...item,
    source: translateText(item.source, locale),
    amount: item.amount ? translateText(item.amount, locale) : item.amount,
    alternatives: item.alternatives?.map((alt) => translateText(alt, locale)),
  };
}

export function getLocalizedNutritionPlan(plan: NutritionPlan, locale: Locale): NutritionPlan {
  const localizedDays = plan.days.map((day) => ({
    ...day,
    meals: day.meals.map((meal) => translateMeal(meal, locale)),
  }));

  const localizedNotes = plan.notes?.map((note) => translateText(note, locale));

  const localizedSubstitutions = Object.fromEntries(
    Object.entries(plan.substitutions).map(([key, items]) => [
      key,
      items.map((item) => translateSubstitution(item, locale)),
    ])
  ) as NutritionPlan["substitutions"];

  const phase = locale === "ar"
    ? plan.phase.replace(/Cutting/i, "تنشيف").replace(/Female/i, "نسائي")
    : locale === "ru"
      ? plan.phase.replace(/Cutting/i, "сушка").replace(/Female/i, "женская")
      : plan.phase;

  const water = locale === "ar"
    ? plan.goals.water.replace(/L/i, "لتر").replace(/day/i, "يوم")
    : locale === "ru"
      ? plan.goals.water.replace(/L/i, "л").replace(/day/i, "день")
      : plan.goals.water;

  const training = locale === "ar"
    ? String(plan.goals.training ?? "").replace(/training/i, "تدريب").replace(/rest/i, "راحة")
    : locale === "ru"
      ? String(plan.goals.training ?? "").replace(/training/i, "тренировка").replace(/rest/i, "отдых")
      : String(plan.goals.training ?? "");

  return {
    ...plan,
    phase,
    goals: {
      ...plan.goals,
      water,
      training: training || plan.goals.training,
    },
    notes: localizedNotes,
    days: localizedDays,
    substitutions: localizedSubstitutions,
  };
}
