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
				'<div id="secDiv">'+
				'<h1>自動陣型配對機</h1>'+
				'輸出秒數: <input id="sec" value="'+_SEC +'"/></div>'+
				charTable +
				'<div id="selDiv"><br />'+
				'<a href="#" onclick="document.title = \'HG/RF F陣\';findHGRF1()">HG/RF F陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'HG/RF b陣\';findHGRF2()">HG/RF b陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'HG/RF 4保1 F陣\';findHGRF3()">HG/RF 4保1 F陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'HG/RF 4保1 b陣\';findHGRF4()">HG/RF 4保1 b陣</a> &nbsp; <br /><br />'+
				'<a href="#" onclick="document.title = \'SMG/AR/HG F陣\';findSMGAR1()">SMG/AR/HG F陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'SMG/AR/HG b陣\';findSMGAR2()">SMG/AR/HG b陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'SMG/AR/HG F陣\';findSMGAR3()">SMG/AR/HG F陣(5號HG可)</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'SMG/AR/HG b陣\';findSMGAR4()">SMG/AR/HG b陣(5號HG可)</a> &nbsp; <br /><br />'+
				'<a href="#" onclick="document.title = \'MG/SG/HG T陣\';findMGSG1()">MG/SG/HG T陣</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'MG/SG/HG |:陣\';findMGSG3()">MG/SG/HG |:陣</a> &nbsp; ' +
				'<a href="#" onclick="document.title = \'MG/SG/HG 74196\';findMGSG4()">MG/SG/HG 74196</a> &nbsp; '+
				'<a href="#" onclick="document.title = \'MG/SG/HG 74163\';findMGSG5()">MG/SG/HG 74163</a> &nbsp; <br /><br />'+
				'<img src="images/grid.png" />'+
				'<br /><br /><br /><br />  &nbsp;' +
				'<a href="https://github.com/chibimonxd/gf">Github</a><br /><br /> &nbsp;' +
				'<a href="https://github.com/ynntk4815/gf">傷害計算核心來自ynntk4815陣型計算機</a><br /><br /> &nbsp;' +
				'</div>'
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
			if (!$(obj).prop("checked")) {
				if ($(obj)[0].id == "chtypehg") { $(".checkTypehg").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtyperf") { $(".checkTyperf").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypesmg") { $(".checkTypesmg").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypear") { $(".checkTypear").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypesg") { $(".checkTypesg").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chtypemg") { $(".checkTypsmg").prop("checked",$(obj).prop("checked"));}
			} else {
				for (var j =0; j < $(".chtype:checked").length;j++) {
					$("."+ $(".chtype:checked:eq("+j+")").attr("son")).prop("checked",true);
				}
			}
		} else {
			$(".checkB").prop("checked",false);

			for (var i =0; i < $(".chrare:checked").length;i++) {
				for (var j =0; j < $(".chtype:checked").length;j++) {
					$("."+ $(".chtype:checked:eq("+j+")").attr("son") + "." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",true);
				}
			}
		}

	} else {
		if ($(".chtype:checked").length == 0) {
			if (!$(obj).prop("checked")) {
				if ($(obj)[0].id == "chrare2") { $(".checkRare2").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare3") { $(".checkRare3").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare4") { $(".checkRare4").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare5") { $(".checkRare5").prop("checked",$(obj).prop("checked"));}
				if ($(obj)[0].id == "chrare6") { $(".checkRare6").prop("checked",$(obj).prop("checked"));}
			} else {
				for (var i =0; i < $(".chrare:checked").length;i++) {
					$("." + $(".chrare:checked:eq("+i+")").attr("son")).prop("checked",true);
				}
			}
		} else {
			$(".checkB").prop("checked",false);

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
    } else if (elementName == EQUIPMENT_CONTAINER) {
        return { 
				find: function(item){
										if ((item == ".equipment_1") || (item == ".equipment_2") || (item == ".equipment_3")) {
											return { 
													html: function(){ 
																		return { 
																				click: function(){ return null },
																				off: function(){ return null }
																				};  
																	} 
												   }; 
										}
					
										if ((item == ".equipment_strengthen_1") || (item == ".equipment_strengthen_2") || (item == ".equipment_strengthen_3")) {
											return { 
													val: function(){ return "10" } 
												   }; 
										}
					
									} 
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
						return { 
								val: function(){ return "0"; } 
							   };  
					}
					if (attr == ".skill_effect") {
						return { 
								val: function(){ return "1";  } 
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
				
    } /*else {
		
		return __gridToUi(grid, elementName);
	}*/
}


function initTable() {
	_SEC = $("#sec").val();
	$("body > a").remove();
	$("body > div > table").css("display","none");
	$("#secDiv").css("display","none");
	$("#selDiv").css("display","none");
	$("body").prepend('<div id="percentDiv"></div>');
	var resultHtml = "<table border='1' width='100%'>"+
			"<tr>"+
				"<th>"+_SEC + "秒傷害"+"</th>"+
				"<th>隊伍編成(全技能,好感100)</th>"+
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
		//if (mCharData[i].name == "K2") isUseSkill = false;
		
		mCharData[i].isUseSkill = isUseSkill;
		mGridToChar[7].isUseSkill = isUseSkill;
	}

}




var RESULTLIST = new Array();


function getDateDiff(t1, t2) {

  var diffMS = t1 - t2;    

  var diffS = diffMS / 1000;    

  var diffM = diffS / 60;
  console.log(diffM + ' minutes');

  
}


var highestDps = 0;
var w;
var threadCount = navigator.hardwareConcurrency || 4;
var doneCount = 0;
var percentArr = new Array();
var remainingList = new Array();
var totalJobCount = 0;
var threadDone = new Array();
function startWorker(LOC1,LOC2,LOC3,LOC4,LOC5,
				ARR1,
				ARR2,
				ARR3,
				ARR4,
				ARR5) {
	w = new Array();
    if(typeof(Worker) !== "undefined") {
		
		
		ARR1 = ARR1.slice();
		ARR2 = ARR2.slice();
		ARR3 = ARR3.slice();
		ARR4 = ARR4.slice();
		ARR5 = ARR5.slice();
		
		if (ARR1.length * ARR2.length < threadCount) {
			threadCount = ARR1.length * ARR2.length;
		}
		console.log(ARR1.length , ARR2.length ,ARR3.length , ARR4.length ,ARR5.length , threadCount);
		
		totalJobCount = ARR1.length * ARR2.length;
		console.log("threadCount", threadCount);
		
		
		for (var i = 0; i < threadCount; i++) {
			w[i] = new Worker("autoWorkers.js");
			threadDone[i] = false;
		}
		
		//create job list
		for (var i = 0; i < ARR1.length; i++) {
			for (var j = 0; j < ARR2.length; j++) {
				remainingList[remainingList.length] = [[ARR1[i]], [ARR2[j]],remainingList.length];
				percentArr[percentArr.length] = 0;
			}
		}

		
		for (var i = 0; i < threadCount; i++) {
			
			var nextJob = remainingList.pop();
			w[i].postMessage([
				i,
				LOC1,LOC2,LOC3,LOC4,LOC5,
				nextJob[0],nextJob[1],ARR3,ARR4,ARR5,mCharData,mAttackFrameData,mEquipmentData,mStringData,mUpdate,mFairyData,_SEC,nextJob[2]]);
			w[i].onmessage = function(event) {
				if (event.data[0] == "done") {
					doneCount++;
					console.log(event.data[1],event.data[2],percentArr.length, "done");
					percentArr[event.data[2]] = 1;
					
					var nextJob = remainingList.pop();
					if (nextJob != null) {
						
						var ARR2_LIST = ",";
						//var ARR2_SKIP = (ARR1.length || ARR2.length)*1.5;
						//if ((doneCount > (ARR1.length || ARR2.length)) && (RESULTLIST.length > 200)) {
						var ARR2_SKIP = ARR2.length*1.5+1;
						if ((doneCount > ARR2.length+1) && (RESULTLIST.length > 200)) {
							//CLEAN UP ARR
							if (doneCount > ARR2_SKIP) {
								for (var x = 0; x < ARR2.length;x++) {
									ARR2[x].used2 = 0;
									ARR2[x].used3 = 0;
									ARR2[x].used4 = 0;
									ARR2[x].used5 = 0;
								}
							}
							for (var x = 0; x < ARR3.length;x++) {
								ARR3[x].used2 = 0;
								ARR3[x].used3 = 0;
								ARR3[x].used4 = 0;
								ARR3[x].used5 = 0;
							}
							for (var x = 0; x < ARR4.length;x++) {
								ARR4[x].used2 = 0;
								ARR4[x].used3 = 0;
								ARR4[x].used4 = 0;
								ARR4[x].used5 = 0;
							}
							for (var x = 0; x < ARR5.length;x++) {
								ARR5[x].used2 = 0;
								ARR5[x].used3 = 0;
								ARR5[x].used4 = 0;
								ARR5[x].used5 = 0;
							}

							RESULTLIST.sort(function(a, b){return b.dps-a.dps});


							for (var t = 0; t <  RESULTLIST.length;t++) {

								if ((RESULTLIST[t].dps > highestDps *buffer) || (RESULTLIST.length < 200)) {
									
									//if (t < 200) {
									//	for (var r = 1; r < RESULTLIST[t].charList.length;r++) {
											//RESULTLIST[t].charList[r].used += Math.pow(10, r);
											//console.log(">" + RESULTLIST[t].charList[r]);
											if (doneCount > ARR2_SKIP) {
												for (var x = 0; x < ARR2.length;x++) {
													if (ARR2[x].id == RESULTLIST[t].charList[1]) {
														ARR2[x].used2++;
													}
												}
											}
											for (var x = 0; x < ARR3.length;x++) {
												if (ARR3[x].id == RESULTLIST[t].charList[2]) {
													ARR3[x].used3++;
												}
											}
											for (var x = 0; x < ARR4.length;x++) {
												if (ARR4[x].id == RESULTLIST[t].charList[3]) {
													ARR4[x].used4++;
												}
											}
											for (var x = 0; x < ARR5.length;x++) {
												if (ARR5[x].id == RESULTLIST[t].charList[4]) {
													ARR5[x].used5++;
												}
											}
									//	}
									//} 
								} else {
									RESULTLIST.pop();
								}
							}
							if (doneCount > ARR2_SKIP) {
								ARR2.sort(function(a, b){return b.used2-a.used2});
							}
							ARR3.sort(function(a, b){return b.used3-a.used3});
							ARR4.sort(function(a, b){return b.used4-a.used4});
							ARR5.sort(function(a, b){return b.used5-a.used5});

							
							if ((RESULTLIST.length > 200) && (RESULTLIST[RESULTLIST.length-1].dps > highestDps *buffer)) {
								
								
								if (doneCount > ARR2_SKIP) {
									while (ARR2.length-1 > 0 && ARR2[ARR2.length-1].used2 == 0) {
										console.log(2, ARR2[ARR2.length-1].name); 
										ARR2.pop();
									}
								}
								
								while (ARR3.length-1 > 0 && ARR3[ARR3.length-1].used3 == 0) {
									console.log(3, ARR3[ARR3.length-1].name); 
									ARR3.pop();
								}
								while (ARR4.length-1 > 0 && ARR4[ARR4.length-1].used4 == 0) {
									console.log(4, ARR4[ARR4.length-1].name); 
									ARR4.pop();
								}
								while (ARR5.length-1 > 0 && ARR5[ARR5.length-1].used5 == 0) {
									console.log(5, ARR5[ARR5.length-1].name); 
									ARR5.pop();
								}
							}
			
						}
						if (doneCount > (ARR1.length || ARR2.length)*1.5) {
							for (var x = 0; x < ARR2.length;x++) {
								ARR2_LIST += ARR2[x].id + ",";
							}
							if (ARR2_LIST.indexOf(","+nextJob[1][0].id +",") != -1) {
								w[event.data[1]].postMessage([
									event.data[1],
									LOC1,LOC2,LOC3,LOC4,LOC5,
									nextJob[0],nextJob[1],ARR3,ARR4,ARR5,mCharData,mAttackFrameData,mEquipmentData,mStringData,mUpdate,mFairyData,_SEC,nextJob[2]]);
							} else {
								//direct Done
								w[event.data[1]].postMessage([
									event.data[1],
									LOC1,LOC2,LOC3,LOC4,LOC5,
									nextJob[0],null,ARR3,ARR4,ARR5,mCharData,mAttackFrameData,mEquipmentData,mStringData,mUpdate,mFairyData,_SEC,nextJob[2]]);
							}
						} else {
							w[event.data[1]].postMessage([
								event.data[1],
								LOC1,LOC2,LOC3,LOC4,LOC5,
								nextJob[0],nextJob[1],ARR3,ARR4,ARR5,mCharData,mAttackFrameData,mEquipmentData,mStringData,mUpdate,mFairyData,_SEC,nextJob[2]]);
						}
					} else {
						threadDone[event.data[1]] = true;
						
						var allDone = true;
						for (var k = 0; k < threadCount; k++) {
							allDone &= threadDone[k];
						}
						if (allDone) {
							RESULTLIST.sort(function(a, b){return b.dps-a.dps});
							console.log(RESULTLIST);

							getDateDiff(new Date(), startTime);
							var resultHtml = "<table border='1' width='100%'>"+
									"<tr>"+
										"<th>"+_SEC + "秒傷害"+"</th>"+
										"<th>隊伍編成(全技能,好感100)</th>"+
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
					}
				} else if (event.data[0] == "percent") {
					//console.log(event.data[1],event.data[2]);
					percentArr[event.data[4]] = event.data[2];
					var sumP = 0;
					for (var g = 0; g < percentArr.length;g++) {
						sumP += percentArr[g]/percentArr.length;
					}
					$("#percentDiv").text(
						parseInt(sumP *10000) / 100 +"%"
					);
					
					if (event.data[3] > highestDps) {
						highestDps = event.data[3];
						for (var i = 0; i < threadCount; i++) {
							w[i].postMessage(["highestDps",highestDps]);
						}
					}
					
				} else {
					$("body > table").prepend(event.data[0]);
					var obj = { dps: event.data[1] , team: event.data[2], charList: event.data[3] };
					RESULTLIST[RESULTLIST.length] = obj;
				}
			};
		}
		
		
    } else {
        console.log("Sorry! No Web Worker support.");
    }
}



function loopCore(
				LOC1,LOC2,LOC3,LOC4,LOC5,
				ARR1,ARR2,ARR3,ARR4,ARR5
				) {
	
    if(typeof(Worker) !== "undefined") {
	
		startWorker(LOC1,LOC2,LOC3,LOC4,LOC5,
				ARR1,ARR2,ARR3,ARR4,ARR5);
	
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
		if ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG")) {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}
		if ((mCharData[i].type == "rf") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			rfhg[rfhg.length] = mCharData[i];
		}
	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	rfhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	
	
	loopCore(
		7,4,1,8,5,
		rf,
		rfhg,
		rf,
		hg,
		hg
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
		if ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG")) {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}
		if ((mCharData[i].type == "rf") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			rfhg[rfhg.length] = mCharData[i];
		}
	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	rfhg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	
	
	loopCore(
		7,4,1,5,2,
		rf,
		rfhg,
		rf,
		hg,
		hg
	);
		
	


}



function findHGRF3() {
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


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }


		mCharData[i].used = 0;
		if ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG")) {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}

	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});


	
	
	loopCore(
		7,4,1,8,5,
		hg,
		rf,
		hg,
		hg,
		hg
	);
		
	


}


function findHGRF4() {
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


	var combineStr =",";
	for (var d = 0; d < $(".checkB:checked").length; d++) {
		combineStr += $(".checkB:checked:eq("+d+")").val() + ",";
	}


	for (var i = 0; i < mCharData.length;i++) {

		if (mCharData[i].version == "cn") continue;
	
		//if (mCharData[i].rarity != 5) continue;
		if (combineStr.indexOf(","+mCharData[i].id+",") === -1) { continue; }


		mCharData[i].used = 0;
		if ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG")) {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "rf") {
			rf[rf.length] = mCharData[i];
		}

	}

	rf.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	
	
	loopCore(
		7,4,1,5,2,
		hg,
		rf,
		hg,
		hg,
		hg
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
		if ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG")) {
			hg[hg.length] = mCharData[i];
		}
		if (mCharData[i].type == "mg") {
			mg[mg.length] = mCharData[i];
		}
		if (mCharData[i].type == "sg") {
			sg[sg.length] = mCharData[i];
		}

		if ((mCharData[i].type == "mg") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			mghg[mghg.length] = mCharData[i];
		}
	}


	hg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});


	
	loopCore(
		7,4,1,5,6,
		mg,
		mghg,
		mg,
		hg,
		sg
	);
		
	


}








function findSMGAR1() {

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

	
	loopCore(
		7,4,1,8,5,
		ar,
		arhg,
		ar,
		smghg,
		smg
	);
		
	


}













function findSMGAR2() {

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

	
	loopCore(
		7,4,1,5,2,
		ar,
		arhg,
		ar,
		smg,
		smghg
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

	
	
	loopCore(
		7,4,1,8,5,
		ar,
		arhg,
		ar,
		smg,
		smghg
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

	
	loopCore(
		7,4,1,5,2,
		ar,
		arhg,
		ar,
		smghg,
		smg
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

		if ((mCharData[i].type == "mg") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});

	
	loopCore(
		7,4,1,9,3,
		mg,
		mghg,
		mg,
		sg,
		sg
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

		if ((mCharData[i].type == "mg") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});


	
	loopCore(
		7,4,1,9,6,
		mg,
		mghg,
		mg,
		sg,
		sg
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

		if ((mCharData[i].type == "mg") || ((mCharData[i].type == "hg") || (mCharData[i].name == "AUG"))){
			mghg[mghg.length] = mCharData[i];
		}
	}



	mg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	sg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});
	mghg.sort(function(a, b){return b.dmgSkill-a.dmgSkill});


	loopCore(
		7,4,1,6,3,
		mg,
		mghg,
		mg,
		sg,
		sg
	);
		
	


}

	

