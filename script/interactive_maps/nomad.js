$(document).ready(function () {
  $(".hide").hide();

  const places = [
    "london",
    "borinage",
    "brussels",
    "dordrecht",
    "thehague",
    "antwerp",
    "amsterdam",
    "drenthe",
    "etten",
    "tilburg",
    "zevenbergen",
    "zundert",
    "nuenen",
    "paris",
    "arles",
    "saintauvers",
    "saintremy",
  ];
  for (const place of places) {
    $("." + place).click(function () {
      const placeNomad = $(".nomad_" + place);
      const wasSelected = placeNomad.is(":visible");
      $(".hide").fadeOut(500);
      if (!wasSelected) placeNomad.fadeIn(300);
    });
  }
});
