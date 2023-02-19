$(function(){
    const sizes = {
        openSpace: 4 * 3,
        bureauSolo: 2,
        meetingRoom: 4 * 2,
        salleTravail: 4
    }

    const zoneSize = {
        z1: 0,
        z2: 0,
        z3: 0,
        z4: 0,
        increase: (z, v) => this[v] = v
    }
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        autoFocus: true,
        transitionEffectSpeed: 200,
        titleTemplate : '<div class="title">#title#</div>',
        labels: {
            previous : 'Back',
            next : 'Next',
            finish : 'Confirm',
            current : ''
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            const modelA = $('#model_a').is(':checked');
            const z3 = $('#zone-3');
            const z4 = $('#zone-4');
            if(!modelA) {

                z3.hide();
                z4.hide();
            } else {

                z3.show();
                z4.show();
            }
            return true;
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            console.log({ event, currentIndex, priorIndex });
            const modelA = $('#model_a').is(':checked');
            const modelP = $('#model_b').is(':checked');
            const z3 = $('#zone-3');
            const z4 = $('#zone-4');
            const mImg = document.querySelector("#model_img");
            if(!modelA) {
                if(modelP) {
                    mImg.src = '/images/dwp_model_P.png';
                    z3.hide();
                    z4.hide();

                    document.querySelector("#day1Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.openSpace;
                        console.log({zoneSize})

                        if (zoneSize.z1 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day2Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.salleTravail;
                        console.log({zoneSize})

                        if (zoneSize.z1 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day3Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.bureauSolo;
                        if (zoneSize.z1 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day4Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.meetingRoom;
                        console.log({zoneSize})
                        if (zoneSize.z1 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    // Zone 2
                    document.querySelector("#day12").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.openSpace);
                        if (zoneSize.z2 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day22").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.salleTravail);
                        if (zoneSize.z2 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day32").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.bureauSolo);
                        if (zoneSize.z2 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day42").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.meetingRoom);
                        if (zoneSize.z2 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });
                } else {
                    mImg.src = '/images/dwp_model_C.png';
                    document.querySelector("#day1Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.openSpace;
                        console.log({zoneSize})

                        if (zoneSize.z1 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day2Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.salleTravail;
                        console.log({zoneSize})

                        if (zoneSize.z1 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day3Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.bureauSolo;
                        if (zoneSize.z1 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day4Z1").addEventListener('change', (e) => {
                        zoneSize.z1 += (+e.target.value) * sizes.meetingRoom;
                        console.log({zoneSize})
                        if (zoneSize.z1 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    // Zone 2
                    document.querySelector("#day12").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.openSpace);
                        if (zoneSize.z2 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day22").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.salleTravail);
                        if (zoneSize.z2 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day32").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.bureauSolo);
                        if (zoneSize.z2 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day42").addEventListener('change', (e) => {
                        zoneSize.increase("z2", (+e.target.value) * sizes.meetingRoom);
                        if (zoneSize.z2 > 20) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });


                    // Zone 3
                    document.querySelector("#day13").addEventListener('change', (e) => {
                        zoneSize.increase("z3", (+e.target.value) * sizes.openSpace);
                        if (zoneSize.z3 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day23").addEventListener('change', (e) => {
                        zoneSize.increase("z3", (+e.target.value) * sizes.salleTravail);
                        if (zoneSize.z3 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day33").addEventListener('change', (e) => {
                        zoneSize.increase("z3", (+e.target.value) * sizes.bureauSolo);
                        if (zoneSize.z3 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });

                    document.querySelector("#day43").addEventListener('change', (e) => {
                        zoneSize.increase("z3", (+e.target.value) * sizes.meetingRoom);
                        if (zoneSize.z3 > 40) {
                            alert("Error");
                            e.target.value = (e.target.value - 1) + "";
                        }
                    });
                }

            } else {
                mImg.src = '/images/dwp_model_A.png';
                document.querySelector("#day1Z1").addEventListener('change', (e) => {
                    zoneSize.z1 += (+e.target.value) * sizes.openSpace;
                    console.log({zoneSize})

                    if (zoneSize.z1 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day2Z1").addEventListener('change', (e) => {
                    zoneSize.z1 += (+e.target.value) * sizes.salleTravail;
                    console.log({zoneSize})

                    if (zoneSize.z1 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day3Z1").addEventListener('change', (e) => {
                    zoneSize.z1 += (+e.target.value) * sizes.bureauSolo;
                    if (zoneSize.z1 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day4Z1").addEventListener('change', (e) => {
                    zoneSize.z1 += (+e.target.value) * sizes.meetingRoom;
                    console.log({zoneSize})
                    if (zoneSize.z1 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                // Zone 2
                document.querySelector("#day12").addEventListener('change', (e) => {
                    zoneSize.increase("z2", (+e.target.value) * sizes.openSpace);
                    if (zoneSize.z2 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day22").addEventListener('change', (e) => {
                    zoneSize.increase("z2", (+e.target.value) * sizes.salleTravail);
                    if (zoneSize.z2 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day32").addEventListener('change', (e) => {
                    zoneSize.increase("z2", (+e.target.value) * sizes.bureauSolo);
                    if (zoneSize.z2 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day42").addEventListener('change', (e) => {
                    zoneSize.increase("z2", (+e.target.value) * sizes.meetingRoom);
                    if (zoneSize.z2 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });


                // Zone 3
                document.querySelector("#day13").addEventListener('change', (e) => {
                    zoneSize.increase("z3", (+e.target.value) * sizes.openSpace);
                    if (zoneSize.z3 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day23").addEventListener('change', (e) => {
                    zoneSize.increase("z3", (+e.target.value) * sizes.salleTravail);
                    if (zoneSize.z3 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day33").addEventListener('change', (e) => {
                    zoneSize.increase("z3", (+e.target.value) * sizes.bureauSolo);
                    if (zoneSize.z3 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day43").addEventListener('change', (e) => {
                    zoneSize.increase("z3", (+e.target.value) * sizes.meetingRoom);
                    if (zoneSize.z3 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                // Zone 4
                document.querySelector("#day1").addEventListener('change', (e) => {
                    zoneSize.increase("z4", (+e.target.value) * sizes.openSpace);
                    if (zoneSize.z4 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day2").addEventListener('change', (e) => {
                    zoneSize.increase("z4", (+e.target.value) * sizes.salleTravail);
                    if (zoneSize.z4 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day3").addEventListener('change', (e) => {
                    zoneSize.increase("z4", (+e.target.value) * sizes.bureauSolo);
                    if (zoneSize.z4 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });

                document.querySelector("#day4").addEventListener('change', (e) => {
                    zoneSize.increase("z4", (+e.target.value) * sizes.meetingRoom);
                    if (zoneSize.z4 > 20) {
                        alert("Error");
                        e.target.value = (e.target.value - 1) + "";
                    }
                });
                z3.show();
                z4.show();
            }
        },
        onFinishing: function (event, currentIndex) {
            /*const data = [];
            $(".day").each(el => {
                data.push({ name: el.name, value: el.val() })
            })*/
            const obj = {
                z1: [],
                z2: [],
                z3: [],
                z4: []
            };
            const serializeArray = document.querySelectorAll(".day")
            serializeArray.forEach(({ name, value: qte }) => {
                qte = qte ? parseInt(qte) : 0;
                if(name.includes("z1")) {
                    obj.z1.push({ spaceType: name.split("[")[0], qte})
                } else    if(name.includes("z2")) {
                    obj.z2.push({ spaceType: name.split("[")[0], qte })
                } else    if(name.includes("z3")) {
                    obj.z3.push({ spaceType: name.split("[")[0], qte })
                } else    if(name.includes("z4")) {
                    obj.z4.push({ spaceType: name.split("[")[0], qte })
                }
            })

            const payload = {
                config: obj,
                floor: 0,
                modelType: $('#model_a').is(':checked') ? 'A'
                    : $('#model_b').is(':checked') ? 'B'
                        : 'C'
            }

            $.ajax({
                url:window.location,
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (_) {
                    window.location = "/dwp/map"
                },
                error: function (xhr, desc, err) {
                    console.log(xhr);
                    console.log("Desc: " + desc + "\nErr:" + err);
                }
            });

            return true;

            },
    });
});
