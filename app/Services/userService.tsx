const login = async () => {
  try {
    const response = await fetch(
      "http://codonnier.tech/ravi/learning/dev/service.php?Service=login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "App-Track-Version": "v1",
          "App-Device-Type": "iOS",
          "App-Store-Version": "1.1",
          "App-Device-Model": "iPhone 8",
          "App-Os-Version": "iOS 11",
          "App-Store-Build-Number": "1.1",
          "App-Secret": "TESTRAVI@2204#$",
        },
        body: JSON.stringify({
          email: "ravi@codonnier.com",
          password: "1234567",
        }),
      }
    );

    const data = await response.json();
    console.log("Login Response:", data);
  } catch (error) {
    console.log("Error:", error);
  }
};

login();
