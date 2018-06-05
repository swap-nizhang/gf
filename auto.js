var startTime = new Date();



var _SEC = 8; //<------second
var buffer = 0.9;



var __gridToUi = null;

$( document ).ready(function () {

	//$(".endTime").val(8);
	setTimeout(
		function(){
			$(".enemyEliteTarget").prop("checked",true);


			var charTable = "<div><table width='100%' border='1'>";
			var typeArray = ["hg", "rf","smg","ar","sg","mg"];
			charTable += "<tr><th></th>";
			for (var i = 0; i < typeArray.length;i++) {
				charTable += "<th><input class='chtype' id='chtype"+typeArray[i]+"' son='checkType"+typeArray[i]+"' type='checkbox' onclick='updateCheckBox(1,this)'>" + typeArray[i].toUpperCase() + "</th>";

			}
			charTable += "</tr>";

			for (var rarity = 6; rarity  >= 2;rarity--) {
				charTable += "<tr>";
				charTable += "<td><input class='chrare' id='chrare"+rarity+"' son='checkRare"+rarity+"' type='checkbox' onclick='updateCheckBox(2,this)'>" + (rarity==6?"extra":rarity) + "</td>";
				for (var i = 0; i < typeArray.length;i++) {
					charTable += "<td>";

					for (var j = 0; j < mCharData.length;j++) {
						if (mCharData[j].version == "cn") continue;
						if (mCharData[j].type != typeArray[i]) continue;
						if (mCharData[j].rarity != (rarity==6?"extra":rarity)) continue;
						charTable += "<input class='checkB checkRare"+ rarity +" checkType"+ typeArray[i] +"' type='checkbox' value='" + mCharData[j].id + "'>" + mCharData[j].name + "<br />";
					}
					charTable += "</td>";
				}
				charTable += "</tr>";

			}
			charTable += "</table></div>";



			$("body").prepend(
				'<div id="secDiv">秒數: <input id="sec" value="'+_SEC +'"/></div>'+
				charTable +
				'<a href="#" onclick="document.title = \'HG/RF F陣\';findHGRF1()">HG/RF F陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'HG/RF b陣\';findHGRF2()">HG/RF b陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'SMG/AR/HG F陣\';findSMGAR3()">SMG/AR/HG F陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'SMG/AR/HG b陣\';findSMGAR4()">SMG/AR/HG b陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'MG/SG/HG T陣\';findMGSG1()">MG/SG/HG T陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'MG/SG/HG |:陣\';findMGSG3()">MG/SG/HG |:陣</a> &nbsp; ' +
				'<a href="#" onclick="document.title = \'MG/SG/HG 74196\';findMGSG4()">MG/SG/HG 74196</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'MG/SG/HG 74163\';findMGSG5()">MG/SG/HG 74163</a> &nbsp;<br /><br /> '
			);
			
			//adapter
			__gridToUi = gridToUi;
			gridToUi = _gridToUi; 
		},1000
	);



});


function updateCheckBox(type,obj){
	//$(\".checkType"+ typeArray[i] +"\").prop(\"checked\",$(this).prop(\"checked\"));
	//$(\".checkRare"+ rarity +"\").prop(\"checked\",$(this).prop(\"checked\"));

	if (type == 1) {
		if ($(".chrare:checked").length == 0) {
			if ($(obj)[0].id == "chtypehg") { $(".checkTypehg").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chtyperf") { $(".checkTyperf").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chtypesmg") { $(".checkTypesmg").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chtypear") { $(".checkTypear").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chtypesg") { $(".checkTypesg").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chtypemg") { $(".checkTypsmg").prop("checked",$(obj).prop("checked"));}
		} else {
			$(".checkB").prop("checked",false);
			/*for (var i =0; i < $(".chrare:checked").length;i++) {
				if ($(obj)[0].id == "chtypehg") { $(".checkTypehg." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtyperf") { $(".checkTyperf." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypesmg") { $(".checkTypesmg." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypear") { $(".checkTypear." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypesg") { $(".checkTypesg." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypemg") { $(".checkTypsmg." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
			}*/

			for (var i =0; i < $(".chrare:checked").length;i++) {
				for (var j =0; j < $(".chtype:checked").length;j++) {
					$("."+ $(".chtype:checked:eq("+j+")").attr("son") + "." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",true);
				}
			}
		}

	} else {
		if ($(".chtype:checked").length == 0) {
			if ($(obj)[0].id == "chrare2") { $(".checkRare2").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chrare3") { $(".checkRare3").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chrare4") { $(".checkRare4").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chrare5") { $(".checkRare5").prop("checked",$(obj).prop("checked"));}
			if ($(obj)[0].id == "chrare6") { $(".checkRare6").prop("checked",$(obj).prop("checked"));}
		} else {
			$(".checkB").prop("checked",false);
			/*for (var i =0; i < $(".chtype:checked").length;i++) {
				if ($(obj)[0].id == "chrare2") { $(".checkRare2." + $(".chtype:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare3") { $(".checkRare3." + $(".chtype:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare4") { $(".checkRare4." + $(".chtype:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare5") { $(".checkRare5." + $(".chtype:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare6") { $(".checkRare6." + $(".chtype:checked:eq("+i+")").attr("son")).prop("checked",$(obj).prop("checked"));}
			}*/
			for (var i =0; i < $(".chrare:checked").length;i++) {
				for (var j =0; j < $(".chtype:checked").length;j++) {
					$("."+ $(".chtype:checked:eq("+j+")").attr("son") + "." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",true);
				}
			}
		}
	}
	

}


//function updateCharObsForBase2(charObj, grid) 
function _gridToUi(grid, elementName) {
    if (elementName == FRIENDSHIP) {
        return { 
				attr: function(){ return FRIENDLY; } 
			   };
    } else if (elementName == CONTROL_CONTAINER) {
        return { 
				find: function(attr){
					if (attr == ".level") { 
						return { 
								val: function(){ return "100" } 
							   }; 
					}
					if (attr == ".skill_control") { 
						return { 
								is: function(){ return getCharObjByGrid(grid).isUseSkill; } 
							   }; 
					}
					if (attr == ".skill_stack") { 
						/*var haveStack = getFilterEffects(getCharObjByGrid(grid)).filter(workWhenHaveBuffFilter(getCharObjByGrid(grid))).filter(v => v.type == "buff" || v.type == "debuff").filter(v => {
							return "stackMax" in v;
						});*/
						return { 
								val: function(){ return "0"; /*haveStack[0].stackMax; */} 
							   };  
					}
					if (attr == ".skill_effect") {
						/*var effectGrouped = getFilterEffectsForUI(getCharObjByGrid(grid)).filter(workWhenHaveBuffFilter(getCharObjByGrid(grid))).filter(v => v.type == "buff" || v.type == "debuff").filter(v => {
							return v.grouped;
						});					*/	
						return { 
								val: function(){ return "1"; /*(effectGrouped.length > 0 ? effectGrouped[0].indexGrouped: 0); */ } 
							   };  
					}
					if (attr == ".skill_level") { 
						return { 
								val: function(){ return "10" } 
							   }; 
					}
					if (attr == ".modLevel") { 
						return { 
								val: function(){ return (getCharObjByGrid(grid).mod ? "3" : "0"); } 
							   }; 
					}
					if (attr == ".mod_skill_level") { 
						return {  
								val: function(){ return "10" } 
							   }; 
					}
				}
			};
				
    } else {
		return __gridToUi(grid, elementName);
	}
}



var updatePerformance2 = updatePerformance;
var updateSkillControlUI2 = updateSkillControlUI;
var updateAuraUI2 = updateAuraUI;
var updateEquipmentUI2 = updateEquipmentUI;
function initTable() {
	_SEC = $("#sec").val();
	$("body > a").remove();
	$("body > div > table").css("display","none");
	$("#secDiv").css("display","none");
	$("body").prepend('<div id="percentDiv"></div>');
	var resultHtml = "<table border='1' width='100%'>"+
			"<tr>"+
				"<th>"+"d"+ _SEC + "s"+"</th>"+
				"<th>team</th>"+
			"</tr>";
	resultHtml += "</table>";

	$("body").append(resultHtml);
	

	
	updatePerformance = function(){};
	updateSkillControlUI = function(){};
	updateAuraUI = function(){};
	updateEquipmentUI = function(){};
	startTime = new Date();
	
	console.log(startTime);
	for (var i = 0; i < mCharData.length;i++) {

		var isUseSkill = true;
		if (mCharData[i].name == "競爭者") isUseSkill = false;
		if (mCharData[i].name == "K2") isUseSkill = false;
		
		mCharData[i].isUseSkill = isUseSkill;
		mGridToChar[7].isUseSkill = isUseSkill;
	}

}



function addChar2(grid, id) {
 
   var t = getChar(id);

   mGridToChar[grid] = t;


    var g = getGridUiObj(grid).attr("grid_value");
    if (mGridHasChar.indexOf(g) >= 0) {

    } else {
        mGridHasChar.push(g);
    }


    setEquipment(grid)
    updateCharObs();

}


function updatePerformance3() {

	var SEC = _SEC; 

	var ally = copyList(getAlly());
	allyInit(ally);
	var enemy = copyObject(ally[0]);
	enemyInit(enemy);

	//Nsdmg
	var dpsSum = 0;
	var sim = battleSimulation(SEC*FRAME_PER_SECOND, 0, copyList(ally), copyObject(enemy), false);
	for (var i =0; i < sim.y.length; i++) {
		dpsSum+= sim.y[i].data[SEC*FRAME_PER_SECOND];
	}
	return parseInt(dpsSum);
}


function dmgNs(SEC) {

	if (SEC == null) { SEC = _SEC; }

	var ally = copyList(getAlly());
	allyInit(ally);
	var enemy = copyObject(ally[0]);
	enemyInit(enemy);

	//Nsdmg
	var dpsSum = 0;
	var sim = battleSimulation(SEC*FRAME_PER_SECOND, 0, copyList(ally), copyObject(enemy), false);
	for (var i =0; i < sim.y.length; i++) {
		dpsSum+= sim.y[i].data[SEC*FRAME_PER_SECOND];
	}
	return parseInt(dpsSum);
}


var RESULTLIST = new Array();
var highestDps = 0;
var charList = new Array();

var highestDNs = 0;

function insertResult(dps, team, charList) { 

	eval("var obj = { dps: dps , "+ "d"+ _SEC + "s" +": 0, team: team , char:charList};");

	if (obj.dps > highestDps *buffer) {	


		RESULTLIST[RESULTLIST.length] = obj;
	
		if (highestDps < obj.dps) {
			highestDps = obj.dps;
		}
	
		//console.log(obj.dps, obj["d"+ _SEC + "s"], obj.team);
		var resultHtml = 
					"<tr>"+
						"<th>"+obj.dps+"</th>"+
						"<th>"+obj.team+"</th>"+
					"</tr>";
			$("body > table").prepend(resultHtml);


	}
}


function getDateDiff(t1, t2) {

  var diffMS = t1 - t2;    

  var diffS = diffMS / 1000;    

  var diffM = diffS / 60;
  console.log(diffM + ' minutes');

  
}



function loopCore(
					LOC1,LOC2,LOC3,LOC4,LOC5,
					ARR1, I1,
					ARR2, I2,
					ARR3, I3,
					ARR4, I4,
					ARR5, I5, isBreak,
					returnFunction
					) {
	
	

	var I4Changed = false;
	var I3Changed = false;
	var I2Changed = false;
	var I1Changed = false;
	
	if (I1 + I2 + I3 + I4 + I5 == 0) {
		I4Changed = true;
		I3Changed = true;
		I2Changed = true;
		I1Changed = true;
	}
	
	
	if (!isBreak) {
		//I5++; 
	} else {
		I4Changed = true;
		I3Changed = true;
		I2Changed = true;
	} 
	var toBreak = false;

	if (I5 == ARR5.length) { I5 = 0; I4++; I4Changed = true; }
	if (I4 == ARR4.length) { I4 = 0; I3++; I3Changed = true; }
	if (I3 == ARR3.length) { I3 = 0; I2++; I2Changed = true; }
	if (I2 == ARR2.length) { 
		I2 = 0; I1++; I1Changed = true; 
		console.log("Round", I1); 
		
			

		//CLEAN UP ARR
		for (var i = 0; i < ARR2.length;i++) {
			ARR2[i].checked = 0;
		}
		for (var i = 0; i < ARR3.length;i++) {
			ARR3[i].checked = 0;
		}
		for (var i = 0; i < ARR4.length;i++) {
			ARR4[i].checked = 0;
		}
		for (var i = 0; i < ARR5.length;i++) {
			ARR5[i].checked = 0;
		}

		RESULTLIST.sort(function(a, b){return b.dps-a.dps});


		for (var t = 0; t <  RESULTLIST.length;t++) {

			if (RESULTLIST[t].dps > highestDps *buffer) {
				
				if (t < 200) {
					for (var r = 0; r < RESULTLIST[t].char.length;r++) {
						RESULTLIST[t].char[r].used += Math.pow(10, r);
					}
				} 
			} else {
				RESULTLIST.pop();
			}
		}

		ARR2.sort(function(a, b){return b.used-a.used});
		ARR3.sort(function(a, b){return b.used-a.used});
		ARR4.sort(function(a, b){return b.used-a.used});
		ARR5.sort(function(a, b){return b.used-a.used});


		for (var i = 0; i < ARR2.length;i++) {
			if (ARR2[i].checked == 0) {
				ARR2[i].used /= 10000.0;
				ARR2[i].checked = 1;
			}
		}
		for (var i = 0; i < ARR3.length;i++) {
			if (ARR3[i].checked == 0) {
				ARR3[i].used /= 10000.0;
				ARR3[i].checked = 1;
			}
		}
		for (var i = 0; i < ARR4.length;i++) {
			if (ARR4[i].checked == 0) {
				ARR4[i].used /= 10000.0;
				ARR4[i].checked = 1;
			}
		}
		for (var i = 0; i < ARR5.length;i++) {
			if (ARR5[i].checked == 0) {
				ARR5[i].used /= 10000.0;
				ARR5[i].checked = 1;
			}
		}
		
		while (ARR2.length-1 > 0 && ARR2[ARR2.length-1].used < 0.00000001) {
			ARR2.pop();
		}
		while (ARR3.length-1 > 0 && ARR3[ARR3.length-1].used < 0.00000001) {
			ARR3.pop();
		}
		while (ARR4.length-1 > 0 && ARR4[ARR4.length-1].used < 0.00000001) {
			ARR4.pop();
		}
		while (ARR5.length-1 > 0 && ARR5[ARR5.length-1].used < 0.00000001) {
			ARR5.pop();
		}



		
	}
	
	if (I4Changed) {
		$("#percentDiv").text(
			parseInt((I1 *ARR2.length*ARR3.length*ARR4.length*ARR5.length + I2 *ARR3.length*ARR4.length*ARR5.length + I3 *ARR4.length*ARR5.length + I4 * ARR5.length + I5) / 
			(ARR1.length * ARR2.length * ARR3.length * ARR4.length * ARR5.length) *10000) / 100 +"%"
		);
	}
	if (I1 == ARR1.length) { 
		//DONE
		
		RESULTLIST.sort(function(a, b){return b.dps-a.dps});
		console.log(RESULTLIST);

		for (var j = 0; j < RESULTLIST.length; j++) {
			if (RESULTLIST[j].dps > highestDps* buffer) {
				for (var y =0; y < RESULTLIST[j].char.length;y++) {
					if (charList.indexOf(RESULTLIST[j].char[y]) === -1){
						charList[charList.length] = RESULTLIST[j].char[y];
						////charCount++;;
						}
				}
			}
		}

		for (var y =0; y <ARR2.length;y++) {
			if (charList.indexOf(ARR2[y]) === -1){
				charList[charList.length] = ARR2[y];
				}
		}
		for (var y =0; y <ARR3.length;y++) {
			if (charList.indexOf(ARR3[y]) === -1){
				charList[charList.length] = ARR3[y];
				}
		}
		for (var y =0; y <ARR4.length;y++) {
			if (charList.indexOf(ARR4[y]) === -1){
				charList[charList.length] = ARR4[y];
				}
		}
		for (var y =0; y <ARR5.length;y++) {
			if (charList.indexOf(ARR5[y]) === -1){
				charList[charList.length] = ARR5[y];
				}
		}
		charList.sort(function(b,a){return (b.rarity == "extra"?6:b.rarity) - (a.rarity == "extra"?6:a.rarity)});
		console.log(charList);
		
		
		returnFunction();
	}
	else {
		

		if (I1Changed) { addChar2(LOC1,ARR1[I1].id); }
		if (I2Changed) { addChar2(LOC2,ARR2[I2].id); }
		if (I3Changed) { addChar2(LOC3,ARR3[I3].id); }
		if (I4Changed) { addChar2(LOC4,ARR4[I4].id); }

		addChar2(LOC5,ARR5[I5].id); 
		
		
		var checkRepeat = [
							ARR1[I1].name,
							ARR2[I2].name,
							ARR3[I3].name,
							ARR4[I4].name,
							ARR5[I5].name
						];
		if ((new Set(checkRepeat)).size === checkRepeat.length) {
			//no repeat

			var dps = updatePerformance3();

			if (dps < highestDps *0.6) {
				I4++;
				I5 = 0;
				toBreak = true;
			} else {

				
				insertResult(dps, 
				//I1 + " " + I2 + " " + I3 + " " + I4 + " " + I5 + " " +
					ARR1[I1].name + " " +
					ARR2[I2].name + " " +
					ARR3[I3].name + " | " +

					ARR4[I4].name + " " +
					ARR5[I5].name,
					
					[ARR1[I1],ARR2[I2],ARR3[I3],ARR4[I4],ARR5[I5]]
				);			
				
			}

		} else {
			checkRepeat = [
							ARR1[I1].name,
							ARR2[I2].name
						];
			if ((new Set(checkRepeat)).size === checkRepeat.length) {
				//no repeat
				
				checkRepeat = [
								ARR1[I1].name,
								ARR2[I2].name,
								ARR3[I3].name
							];
				if ((new Set(checkRepeat)).size === checkRepeat.length) {
					//no repeat
					
					checkRepeat = [
									ARR1[I1].name,
									ARR2[I2].name,
									ARR3[I3].name,
									ARR4[I4].name
								];
					if ((new Set(checkRepeat)).size === checkRepeat.length) {
						//no repeat
						I5++;
						toBreak = true;
					
					} else {
						// I4 repeat
						I4++;
						I5 = 0;
						toBreak = true;
					}
		
				
				} else {
					// I3 repeat
					I3++;
					I4 = 0;
					I5 = 0;
					toBreak = true;
				}
				
			} else {
				// I2 repeat
				I2++;
				I3 = 0;
				I4 = 0;
				I5 = 0;
				toBreak = true;
			}
			
		}
	
	
		if (!toBreak) {
			I5++; 
		} 
		setTimeout(
			function() {
					loopCore(
						LOC1,LOC2,LOC3,LOC4,LOC5,
						ARR1, I1,
						ARR2, I2,
						ARR3, I3,
						ARR4, I4,
						ARR5, I5, toBreak,
						returnFunction
					);
			},
			10
		);
						





				
		
		
		
	}


	
	
}


function findHGRF1() {
	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();
	var rfhg = new Array();


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }


		mCharData[i].used = 0;
		if (mCharData[i].type == "hg") {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}
		if ((mCharData[i].type == "rf") || (mCharData[i].type == "hg")){
			rfhg[rfhg.length] = mCharData[i];
		}
	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	rfhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var rf1 = rf.slice();

	
	
	
	loopCore(
		7,4,1,8,5,
		rf1, 0,
		rfhg, 0,
		rf, 0,
		hg, 0,
		hg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}





function findHGRF2() {
	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();
	var rfhg = new Array();


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "hg") {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}
		if ((mCharData[i].type == "rf") || (mCharData[i].type == "hg")){
			rfhg[rfhg.length] = mCharData[i];
		}
	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	rfhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var rf1 = rf.slice();

	
	
	
	loopCore(
		7,4,1,5,2,
		rf1, 0,
		rfhg, 0,
		rf, 0,
		hg, 0,
		hg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}







function findMGSG1() {
	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var mghg = new Array();



	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "hg") {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "mg") {
			mg[mg.length] = mCharData[i];
		}
		if (mCharData[i].type == "sg") {
			sg[sg.length] = mCharData[i];
		}

		if ((mCharData[i].type == "mg") || (mCharData[i].type == "hg")){
			mghg[mghg.length] = mCharData[i];
		}
	}


	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var mg1 = mg.slice();

	
	
	loopCore(
		7,4,1,5,6,
		mg1, 0,
		mghg, 0,
		mg, 0,
		hg, 0,
		sg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}








function findSMGAR3() {

	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var smghg = new Array();
	var arhg = new Array();


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "ar") {
			ar[ar.length] = mCharData[i];
		}
		if (mCharData[i].type == "smg") {
			smg[smg.length] = mCharData[i];
		}
		if ((mCharData[i].type == "ar") || (mCharData[i].type == "hg")) {
			arhg[arhg.length] = mCharData[i];
		}
		if ((mCharData[i].type == "smg") || (mCharData[i].type == "hg")) {
			smghg[smghg.length] = mCharData[i];
		}
	}


	ar.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	smg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	arhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	smghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	var ar1 = ar.slice();
	
	
	loopCore(
		7,4,1,8,5,
		ar1, 0,
		arhg, 0,
		ar, 0,
		smghg, 0,
		smg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}













function findSMGAR4() {

	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var smghg = new Array();
	var arhg = new Array();


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "ar") {
			ar[ar.length] = mCharData[i];
		}
		if (mCharData[i].type == "smg") {
			smg[smg.length] = mCharData[i];
		}
		if ((mCharData[i].type == "ar") || (mCharData[i].type == "hg")) {
			arhg[arhg.length] = mCharData[i];
		}
		if ((mCharData[i].type == "smg") || (mCharData[i].type == "hg")) {
			smghg[smghg.length] = mCharData[i];
		}
	}


	ar.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	smg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	arhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	smghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	var ar1 = ar.slice();
	
	
	loopCore(
		7,4,1,5,2,
		ar1, 0,
		arhg, 0,
		ar, 0,
		smg, 0,
		smghg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}











function findMGSG3() {

	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var mghg = new Array();



	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "mg") {
			mg[mg.length] = mCharData[i];
		}
		if (mCharData[i].type == "sg") {
			sg[sg.length] = mCharData[i];
		}

		if ((mCharData[i].type == "mg") || (mCharData[i].type == "hg")){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var mg1 = mg.slice();
	
	
	loopCore(
		7,4,1,9,3,
		mg1, 0,
		mghg, 0,
		mg, 0,
		sg, 0,
		sg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}

	






function findMGSG4() {	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var mghg = new Array();



	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "mg") {
			mg[mg.length] = mCharData[i];
		}
		if (mCharData[i].type == "sg") {
			sg[sg.length] = mCharData[i];
		}

		if ((mCharData[i].type == "mg") || (mCharData[i].type == "hg")){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var mg1 = mg.slice();
	
	
	loopCore(
		7,4,1,9,6,
		mg1, 0,
		mghg, 0,
		mg, 0,
		sg, 0,
		sg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}

	








function findMGSG5() {	initTable();


	

	// 7 8 9
	// 4 5 6
	// 1 2 3

	RESULTLIST = new Array();
	var hg = new Array();
	var rf = new Array();
	var smg = new Array();
	var ar = new Array();
	var mg = new Array();
	var sg = new Array();

	var mghg = new Array();



	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }

		mCharData[i].used = 0;
		if (mCharData[i].type == "mg") {
			mg[mg.length] = mCharData[i];
		}
		if (mCharData[i].type == "sg") {
			sg[sg.length] = mCharData[i];
		}

		if ((mCharData[i].type == "mg") || (mCharData[i].type == "hg")){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	var mg1 = mg.slice();
	
	
	loopCore(
		7,4,1,6,3,
		mg1, 0,
		mghg, 0,
		mg, 0,
		sg, 0,
		sg, 0, false,
		function () {
			
			updatePerformance = updatePerformance2;
			updateSkillControlUI = updateSkillControlUI2;
			updateAuraUI = updateAuraUI2;
			updateEquipmentUI = updateEquipmentUI2;

			getDateDiff(new Date(), startTime);
			var resultHtml = "<table border='1' width='100%'>"+
					"<tr>"+
						"<th>"+"d"+ _SEC + "s"+"</th>"+
						"<th>team</th>"+
					"</tr>";

			for (var g = 0; g < RESULTLIST.length;g++) {
				resultHtml += 
					"<tr>"+
						"<td>"+RESULTLIST[g].dps+"</td>"+
						"<td>"+RESULTLIST[g].team+"</td>"+
					"</tr>";
			}

			resultHtml += "</table>";

			$("body").html(resultHtml);
	
		}
	);
		
	


}

	

