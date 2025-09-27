const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "15px",
        marginTop: "20px",
        backgroundColor: "#f1f1f1",
        color: "#555",
      }}
    >
      <p>© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
