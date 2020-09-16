firebase.firestore().enablePersistence()
        .then(function() {
            // Initialize Cloud Firestore through firebase
            var db = firebase.firestore();
        })
        .catch(function(err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
      // [END initialize_persistence]
    });

    it("should be able to enable/disable network", () => {
        var disable =
        // [START disable_network]
        firebase.firestore().disableNetwork()
            .then(function() {
                // Do offline actions
                // [START_EXCLUDE]
                console.log("Network disabled!");
                // [END_EXCLUDE]
            });
        // [END disable_network]

        var enable =
        // [START enable_network]
        firebase.firestore().enableNetwork()
            .then(function() {
                // Do online actions
                // [START_EXCLUDE]
                console.log("Network enabled!");
                // [END_EXCLUDE]
            });
        // [END enable_network]

        return Promise.all([enable, disable]);
    });

    it("should reply with .fromCache fields", () => {
      // [START use_from_cache]
      db.collection("cities").where("state", "==", "CA")
        .onSnapshot({ includeQueryMetadataChanges: true }, function(snapshot) {
            snapshot.docChanges.forEach(function(change) {
                if (change.type === "added") {
                    console.log("New city: ", change.doc.data());
                }

                var source = snapshot.metadata.fromCache ? "local cache" : "server";
                console.log("Data came from " + source);
            });
        });
      // [END use_from_cache]
    });
//data available without Network
