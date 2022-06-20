var char, charSet, charSetName, correctButton, falseCharSet, usedValues, wrongButtons, brightMode;
			const charSetList = ["Basic Latin (ASCII)", "Latin-1 Supplement", "Hebrew", "Hebrew", "Hebrew", "CJK Unified Ideographs (Han)", "Arabic", "Javanese", "Javanese", "Javanese", "Hiragana", "Hiragana", "Cyrillic", "Greek and Coptic", "Greek and Coptic", "Greek and Coptic", "Greek and Coptic", "Greek and Coptic", "Greek and Coptic", "Carian", "Glagolitic", "Cypro-Minoan", "Armenian", "Armenian", "Armenian", "Latin Extended-A", "Gothic", "Cyrillic Supplement", "Runic", "Caucasian Albanian", "Elbasan", "Linear A", "Linear A", "Linear A", "Phaistos Disc", "Lycian", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Vithkuqi", "Shavian", "Lydian", "Lydian", "Ogham", "Latin Extended-B", "Old Hungarian", "Old Hungarian", "Old Hungarian", "Georgian", "Georgian", "Georgian", "Georgian", "Old Italic", "Old Italic", "Old Permic", "Linear B", "Linear B", "Linear B", "Linear B", "Linear B", "Linear B Syllabary", "Linear B Ideograms", "Aegean Numbers", "Aegean Numbers", "Aegean Numbers"];
			const charSetFirstNumInIntervalList = [33, 161, 1425, 1488, 1519, 19968, 1537, 43392, 43471, 43486, 12353, 12441, 1024, 880, 890, 900, 908, 910, 931, 66208, 11264, 77712, 1329, 1369, 1421, 256, 66352, 1280, 5792, 66864, 66927, 66816, 67072, 67392, 67424, 66000, 66176, 66928, 66940, 66956, 66964, 66967, 66979, 66995, 67003, 66640, 67872, 67903, 5760, 384, 68736, 68800, 68858, 4256, 4295, 4301, 4304, 66304, 66349, 66384, 65536, 65549, 65576, 65596, 65599, 65616, 65664, 65792, 65799, 65847];
			const charSetLastNumInIntervalList = [127, 255, 1479, 1512, 1524, 40959, 1791, 43469, 43481, 43487, 12438, 12447, 1279, 887, 895, 906, 908, 929, 1023, 66256, 11359, 77810, 1366, 1418, 1423, 383, 66378, 1327, 5880, 66915, 66927, 66855, 67382, 67413, 67431, 66045, 66204, 66938, 66954, 66962, 66965, 66977, 66993, 67001, 67004, 66687, 67897, 67903, 5788, 591, 68786, 68850, 68863, 4293, 4295, 4301, 4351, 66339, 66351, 66426, 66547, 65574, 65594, 65597, 65613, 65629, 65786, 65794, 65843, 65855];
			const fontList = ["Noto Sans", "Noto Sans", "Noto Sans Hebrew", "Noto Sans Hebrew", "Noto Sans Hebrew", "Noto Sans SC", "Noto Sans Arabic", "Noto Sans Javanese", "Noto Sans Javanese", "Noto Sans Javanese", "Noto Sans Japanese", "Noto Sans Japanese", "Noto Sans", "Noto Sans", "Noto Sans", "Noto Sans", "Noto Sans", "Noto Sans", "Noto Sans", "Noto Sans Carian", "Noto Sans Glagolitic", "Noto Sans Cypro-Minoan", "Noto Sans Armenian", "Noto Sans Armenian", "Noto Sans Armenian", "Noto Sans", "Noto Sans Gothic", "Noto Sans", "Noto Sans Runic", "Noto Sans Caucasian Albanian", "Noto Sans Elbasan", "Noto Sans Linear A", "Noto Sans Linear A", "Noto Sans Linear A", "Noto Sans Phaistos Disc", "Noto Sans Lycian", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Vithkuqi", "Noto Sans Shavian", "Noto Sans Lydian", "Noto Sans Ogham", "Noto Sans", "Noto Sans Old Hungarian", "Noto Sans Old Hungarian", "Noto Sans Georgian", "Noto Sans Georgian", "Noto Sans Georgian", "Noto Sans Georgian", "Noto Sans Old Italic", "Noto Sans Old Italic", "Noto Sans Old Permic", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Linear B", "Noto Sans Aegean Numbers", "Noto Sans Aegean Numbers", "Noto Sans Aegean Numbers"]
			const happyPhrases = ["Amazing", "Nice", "Whoa!", "Whoo!", "Easy."];
			const sadPhrases = ["NO!!!", "Ooh, so close.", "Nah.", "Sorry."]
			const badCharSets = ["Cypro-Minoan", "Vithkuqi"]
			let character, buttons, instructions;
			character = document.getElementById("character");
			buttons = document.querySelectorAll(".choice");
			instructions = document.getElementById("instructions")
			brightness = true;
			function randomIntFromInterval(min, max) { // min and max included 
				return Math.floor(Math.random() * (max - min + 1) + min);
			}
			function equalButtons() {
				var buttonList = buttons;
				var button = 0;
				if (buttonList.length % 2 == 1) {
					buttonList.pop();
				}
				for (let i = 0; i < buttonList.length / 2 - 1; i += 2) {
					if (buttonList[i].style.height != buttonList[i + 1].style.height) {
						buttonList[i].style.height = max(buttonList[i].style.height, buttonList[i + 1].style.height);
						buttonList[i + 1].style.height = max(buttonList[i].style.height, buttonList[i + 1].style.height);
					}
				}
			}
			function setup() {
				wrongButtons = [];
				clickable = true;
				usedValues = [];
				charSet = null;
				while (badCharSets.includes(charSetList[charSet]) || charSet == null) {
					charSet = randomIntFromInterval(0, charSetList.length - 1);
				}
				char = randomIntFromInterval(charSetFirstNumInIntervalList[charSet], charSetLastNumInIntervalList[charSet]);
				charSetName = charSetList[charSet];
				character.innerHTML = String.fromCodePoint(char);
				correctButton = randomIntFromInterval(0, buttons.length - 1);
				buttons[correctButton].innerHTML = charSetName;
				usedValues.push(charSetName);
				for (let i = 0; i < buttons.length; i++) {
					if (i !== correctButton) {
						falseCharSet = randomIntFromInterval(0, charSetList.length - 1);
						while (usedValues.includes(charSetList[falseCharSet])) {
							falseCharSet = randomIntFromInterval(0, charSetList.length - 1);
						}
						buttons[i].innerHTML = charSetList[falseCharSet];
						wrongButtons.push(buttons[i]);
						usedValues.push(charSetList[falseCharSet]);
					}
					if (brightMode) {
						buttons[i].className = "w3-button w3-white w3-block w3-xxlarge";
					} else {
						buttons[i].className = "w3-button w3-black w3-block w3-xxlarge";
					}
				}
				character.style.fontFamily = fontList[charSet];
				instructions.innerHTML = "Click one";
				equalButtons();
			}
			function verify(button) {
				if (clickable) {
					buttons[correctButton].className = "w3-button w3-green w3-block w3-xxlarge w3-hover-green";
					for (let i = 0; i < wrongButtons.length; i++) {
						wrongButtons[i].className = "w3-button w3-red w3-block w3-xxlarge w3-hover-red";
					}
					if (button.innerHTML === charSetName) {
						instructions.innerHTML = happyPhrases[randomIntFromInterval(0, happyPhrases.length - 1)];
					} else {
						instructions.innerHTML = sadPhrases[randomIntFromInterval(0, sadPhrases.length - 1)];
					}
					clickable = false;
				}
			}
			function toggleBrightness() {
				var buttonList = document.getElementsByTagName("button");
				if (brightMode) {
					for (let i = 0; i < buttonList.length; i++) {
						buttonList[i].className = buttonList[i].className.replace(/w3-black/i, "w3-gray");
					}
					document.getElementsByTagName("body").className.replace(/w3-black/i, "w3-white");
				} else {
					for (let i = 0; i < buttonList.length; i++) {
						buttonList[i].className = buttonList[i].className.replace(/w3-gray/i, "w3-black");
					}
					document.getElementsByTagName("body").className.replace(/w3-white/i, "w3-black");
				}
			}
			setup();
