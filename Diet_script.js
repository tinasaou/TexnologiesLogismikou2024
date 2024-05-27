
    document.getElementById("dietForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        
        var age = parseInt(document.getElementById("age").value);
        var weight = parseInt(document.getElementById("weight").value);
        var goal = document.getElementById("goal").value;
        var activityLevel = document.getElementById("activity").value;
        
        var bmr;
        
        // Calculate BMR based on age, weight, and activity level
        if (activityLevel === "sedentary") {
            bmr = 1.2 * (655 + (9.6 * weight) + (1.8 * age));
        } else if (activityLevel === "lightlyActive") {
            bmr = 1.375 * (655 + (9.6 * weight) + (1.8 * age));
        } else if (activityLevel === "moderatelyActive") {
            bmr = 1.55 * (655 + (9.6 * weight) + (1.8 * age));
        } else if (activityLevel === "veryActive") {
            bmr = 1.725 * (655 + (9.6 * weight) + (1.8 * age));
        } else if (activityLevel === "extraActive") {
            bmr = 1.9 * (655 + (9.6 * weight) + (1.8 * age));
        }
        
        // Adjust BMR based on goal
        if (goal === "lose") {
            bmr *= 0.8; // Reduce calorie intake by 20% for weight loss
        } else if (goal === "gain") {
            bmr *= 1.2; // Increase calorie intake by 20% for weight gain
        }
        
        // Calculate daily calorie intake
        var calorieIntake = Math.round(bmr);
        
        // Display calorie intake
        document.getElementById("calories").innerHTML = "Your daily calorie intake: " + calorieIntake + " calories";
        
        // Generate meal plan
        var mealPlan = generateMealPlan(calorieIntake);
        
        // Display meal plan
        var mealPlanList = document.getElementById("mealPlan");
        mealPlanList.innerHTML = ""; // Clear previous results
        mealPlan.forEach(function(item) {
            var listItem = document.createElement("li");
            listItem.textContent = item;
            mealPlanList.appendChild(listItem);
        });
        
        document.getElementById("recalculate").addEventListener("click", function(event) {
            clearInputs();
            clearResults();
        });
        
        document.getElementById("exportPDF").addEventListener("click",function(event){
            exportAsPDF();
        });

        function clearInputs(){
            document.getElementById("age").value="";
            document.getElementById("weight").value="";
            document.getElementById("goal").selectedIndex=0;
            document.getElementById("activity").selectedIndex=0;
        }

        function exportAsPDF() {
            const mealPlanContent = document.getElementById("mealPlan");
        
            // Apply custom styles to the meal plan content
            mealPlanContent.querySelectorAll("li").forEach(item => {
                item.style.padding = "10px";
                item.style.borderBottom = "1px solid #ddd";
                item.style.backgroundColor = "#f9f9f9";
                item.style.fontFamily = "Arial, sans-serif";
                item.style.fontSize = "14px";
                item.style.color = "#333";
            });
        
            // Generate PDF
            html2pdf()
                .from(mealPlanContent)
                .set({
                    margin: 20,
                    filename: 'meal_plan.pdf',
                    html2canvas: { scale: 2 },
                    jsPDF: { format: 'a4', orientation: 'portrait' }
                })
                .save();
        }

        function clearResults() {
            document.getElementById("calories").textContent = "";
            document.getElementById("protein").textContent = "";
            document.getElementById("carbs").textContent = "";
            document.getElementById("mealPlan").innerHTML = "";
            document.getElementById("result").style.display = "none";
        }
        

        // Calculate macronutrients
        var protein = Math.round(weight * 0.8); // 0.8 grams of protein per kg of body weight
        var carbs = Math.round(calorieIntake * 0.5 / 4); // 50% of calories from carbs, assuming 4 calories per gram
        
        // Display macronutrients
        document.getElementById("protein").textContent = protein + " g";
        document.getElementById("carbs").textContent = carbs + " g";
        
        // Show the result section
        document.getElementById("result").style.display = "block";
    });
    
    function generateMealPlan(calories) {
        var breakfast = "Oatmeal with fruit";
        var lunch = "Grilled chicken salad";
        var dinner = "Salmon with quinoa and vegetables";
        
        // You can customize meal plans based on calorie intake
        if (calories < 1500) {
            breakfast = "Yogurt with granola";
            lunch = "Turkey sandwich with whole wheat bread";
            dinner = "Stir-fried tofu with brown rice";
        } else if (calories < 2000) {
            breakfast = "Avocado toast with eggs";
            lunch = "Quinoa salad with chickpeas";
            dinner = "Pasta primavera with marinara sauce";
        }
        
        return [breakfast, lunch, dinner];
    }