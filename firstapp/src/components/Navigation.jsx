import { Link, useNavigate } from 'react-router-dom'

export default function Navigation() {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const userRole = localStorage.getItem("role")
  console.log(userRole)
  function handleLogout(){
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    navigate("/login")
  }
  return (
    <div>
      <Link to="/">Home</Link>
      {
        userId ? (
          <>
            {userRole == "admin" ? (
              <>
              <Link to="/add-product">Add Product</Link> 
                <Link onClick={handleLogout}>Logout</Link>

              </>
            ): 
            (
              <>
                <Link to="/cart">Cart</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )
      }
    </div>
  )
}