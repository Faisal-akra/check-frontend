import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    msg: "",
    token: "",
  });

  const navigate = useNavigate();

  const handleData = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          msg: data.msg,
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          console.warn("No token recived in login response");
        }
        setFormData({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        setMessage({
          msg: data.msg,
          token: "",
        });
      }
    } catch (error) {
      console.log(error, "error");
      setMessage({
        msg: "An error",
        token: "",
      });
    }
  };

  return (
    <div>
      <div className="absolute top-4 right-4 w-[300px]">
        <div className="flex flex-col items-end gap-2">
          <p className="text-right text-sm">your not register?</p>
          <NavLink
            to="/"
            className="border bg-blue-300 rounded-2xl px-4 py-2 hover:bg-blue-300 transition text-center w-[200px]"
          >
            Register
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen text-center text-xl">
        <div className="flex flex-wrap flex-col justify-center gap-16 bg-blue-50 h-[500px] w-[500px] border border-solid">
          <div>
            <h1>Login Form</h1>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center">
            <form onSubmit={handleLogin}>
              <input
                className="border border-black text-center rounded-2xl w-[300px] mb-4 p-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleData}
                required
                placeholder="Enter your email"
              />

              <input
                className="border border-black text-center rounded-2xl w-[300px] mb-4 p-2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleData}
                required
                placeholder="Enter your Password"
              />

              <div>
                <button
                  className="ml-auto mr-auto border w-[300px] bg-blue-200 rounded-2xl p-2 hover:bg-blue-300 transition"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>

            {message.msg && (
              <div className="mt-4 w-[300px] p-3 bg-blue-100 rounded-md">
                <p className="font-medium">{message.msg}</p>
                {message.token && (
                  <p className="mt-2 text-sm break-all">
                    <span className="font-medium">Token: </span>
                    {message.token}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
