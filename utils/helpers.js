module.exports = {
  format_time: (date) => {
    return date ? date.toLocaleTimeString() : ''; // Check if date is defined
  },
  format_date: (date) => {
    return date ? date.toLocaleDateString() : ''; // Check if date is defined
  },
};