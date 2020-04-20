// Need to set required fields
function bindRemeasureValidate(){

  setDefaults_remeasure()

  dbhCheck_remeasure() // still need database look up
  $('input#dbh_r').change(() => { dbhCheck_remeasure(); });

  crownPercentageCheck_remeasure()
  $('input#crown_percentage_r').change(() => { crownPercentageCheck_remeasure(); });
  $('select#main_stem_r').change(() => { crownPercentageCheck_remeasure(); });

  treePercentageCheck_remeasure()
  $('input#tree_percentage_r').change(() => { treePercentageCheck_remeasure(); });
  $('input#crown_percentage_r').change(() => { treePercentageCheck_remeasure(); });

  // mapping
  fromCheck_remeasure() // need to do database look up

  distanceCheck_remeasure()

}

function setDefaults_remeasure(){
        $('select#overall_vigor_r option[value="1"]').attr("selected",true)
        $('select#main_stem_r option[value="1"]').attr("selected",true)
        $('select#rooting_r option[value="1"]').attr("selected",true)
        $('input#lean_angle_r').val(0)
        $('input#crown_percentage_r').val(100)
        $('input#tree_percentage_r').val(100)
}

function dbhCheck_remeasure(){

    let dbh = $('input#dbh_r')

    //getting previous value from database
    prevDbhVal = 'NULL'
    let prevData = JSON.parse(localStorage.getItem(Constants.LocalStorageKeys.TREE_QUERY_RESULTS));
    $.each(prevData, (key,value) =>{
      if(key == 'dbh')
        prevDbhVal = value
    })

    dbh.change(()=>{
      let dbhVal = Number(dbh.val())
      console.log(dbhVal) // for testing
      //check if less than previous
      if(dbhVal < prevDbhVal){
        $('#dbh_check_op1_r').modal('show')
        $( "#yes_dbh_op1_r" ).click(function() {
          $('#dbh_check_op1_r').modal('hide')
        })
        $( "#no_dbh_op1_r" ).click(function() {
          $('#dbh_r').val(" ")
          $('#dbh_check_op1_r').modal('hide')
        })
      }

      //check if greater by 5 cm since previous
      if(dbhVal > (prevDbhVal + 5)){
        $('#dbh_check_op2_r').modal('show')
        $( "#yes_dbh_op2_r" ).click(function() {
          $('#dbh_check_op2_r').modal('hide')
        })
        $( "#no_dbh_op2_r" ).click(function() {
          $('#dbh_r').val(" ")
          $('#dbh_check_op2_r').modal('hide')
        })
      }
    })

}

function crownPercentageCheck_remeasure(){
  let crownPct = $('input#crown_percentage_r')
  let crownPctVal = Number(crownPct.val())
  let mainStemVal = Number($('select#main_stem_r').val())

  if(mainStemVal === 2 && crownPctVal === 100){
    setValidityMsg(crownPct, 'If main stem is 2 then crown % must be < 100%')
  }
}

function treePercentageCheck_remeasure(){
  let tree = $('input#tree_percentage_i')
  let treeVal = Number(tree.val())
  let crownVal = Number($('input#crown_percentage_i').val())
  let mainStemVal = Number($('select#main_stem_r').val())

  if(treeVal < crownVal){
    setValidityMsg(tree, 'Tree % cannot be less then crown %.')
  } else if(treeVal == 100 && mainStemVal == 2){
    setValidityMsg(tree, 'Tree % cannot be less than 100% if Main_Stem=2 (broken)')
  } else if(treeVal == 100 && mainStemVal == 1){
    setValidityMsg(tree, 'If tree % < 100 then Main_Stem must be 2 or 3 (broken)')
  }
}

function fromCheck_remeasure(){

}

function distanceCheck_remeasure(){

  let distance = $('input#distance_r')

  distance.change(()=>{
    let distanceVal = Number(distance.val())
    if(distanceVal > 10){
      alert("Is there a closer mapped tree?")
    }
  })
}
