import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://check-frontend-rho.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg);
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      console.log(error, "error");
      setMessage("server error");
    }
  };

  return (
    <div>
      <div className="absolute top-4 right-4 w-[300px]">
        <div className="flex flex-col items-end gap-2">
          <p className="text-right text-sm">Already registered?</p>
          <NavLink
            to="/login"
            className="border bg-blue-300 rounded-2xl px-4 py-2 hover:bg-blue-300 transition text-center w-[200px]"
          >
            Login
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen text-center text-xl">
        <div className="flex flex-wrap flex-col justify-center gap-16 bg-blue-50 h-[500px] w-[500px] border border-solid">
          <div>
            <h1>Registration Form</h1>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center">
            <form onSubmit={handleRegister}>
              <input
                className="border border-black text-center rounded-2xl w-[300px] mb-4 p-2"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleData}
                required
                placeholder="Enter your name"
              />

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

            {message && (
              <div
                className={`mt-4 text-center text-sm p-3  w-[300px] bg-blue-400 rounded-md }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
