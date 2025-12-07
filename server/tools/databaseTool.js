import Employee from '../models/Employee.js';
import Order from '../models/Order.js';

export const initializeDatabase = async () => {
  try {
    const employeeCount = await Employee.countDocuments();
    if (employeeCount === 0) {
      const employees = [
        { name: 'John Smith', position: 'Software Engineer', department: 'Engineering', salary: 95000, joinDate: new Date('2023-01-15'), email: 'john@company.com' },
        { name: 'Sarah Johnson', position: 'Product Manager', department: 'Product', salary: 85000, joinDate: new Date('2023-06-20'), email: 'sarah@company.com' },
        { name: 'Michael Chen', position: 'DevOps Engineer', department: 'Engineering', salary: 100000, joinDate: new Date('2024-11-01'), email: 'michael@company.com' },
        { name: 'Emma Williams', position: 'Data Analyst', department: 'Analytics', salary: 75000, joinDate: new Date('2023-03-10'), email: 'emma@company.com' },
        { name: 'David Brown', position: 'Senior Engineer', department: 'Engineering', salary: 120000, joinDate: new Date('2022-05-05'), email: 'david@company.com' }
      ];
      await Employee.insertMany(employees);
      console.log('Employees seeded');
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      const orders = [
        { orderId: 'ORD001', customerName: 'Alice Tech', amount: 750, status: 'completed', createdDate: new Date('2024-12-01'), items: 'Laptop, Mouse, Keyboard' },
        { orderId: 'ORD002', customerName: 'Bob Industries', amount: 1200, status: 'completed', createdDate: new Date('2024-12-02'), items: 'Server Hardware' },
        { orderId: 'ORD003', customerName: 'Charlie Corp', amount: 350, status: 'pending', createdDate: new Date('2024-12-03'), items: 'Software License' },
        { orderId: 'ORD004', customerName: 'Diana Solutions', amount: 580, status: 'completed', createdDate: new Date('2024-12-04'), items: 'Network Equipment' },
        { orderId: 'ORD005', customerName: 'Eve Enterprises', amount: 2100, status: 'completed', createdDate: new Date('2024-12-05'), items: 'Cloud Infrastructure' }
      ];
      await Order.insertMany(orders);
      console.log('Orders seeded');
    }
  } catch (error) {
    console.log('Database initialization error:', error);
  }
};

export const queryDatabase = async (queryType, params) => {
  try {
    if (queryType === 'employees_joined_last_month') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const employees = await Employee.find({ joinDate: { $gte: lastMonth } });
      if (employees.length === 0) {
        return 'No employees joined last month.';
      }
      return `${employees.length} employee(s) joined last month: ${employees.map(e => e.name).join(', ')}.`;
    }

    if (queryType === 'orders_over_amount') {
      const amount = params.amount || 500;
      const orders = await Order.find({ amount: { $gt: amount } });
      if (orders.length === 0) {
        return `No orders found over $${amount}.`;
      }
      return `Found ${orders.length} order(s) over $${amount}: ${orders.map(o => `${o.orderId} ($${o.amount})`).join(', ')}.`;
    }

    if (queryType === 'employees_by_department') {
      const department = params.department || 'Engineering';
      const employees = await Employee.find({ department });
      if (employees.length === 0) {
        return `No employees found in ${department} department.`;
      }
      return `${employees.length} employee(s) in ${department}: ${employees.map(e => e.name).join(', ')}.`;
    }

    if (queryType === 'average_salary') {
      const result = await Employee.aggregate([
        { $group: { _id: null, avgSalary: { $avg: '$salary' } } }
      ]);
      const avgSalary = result[0]?.avgSalary || 0;
      return `The average salary is $${Math.round(avgSalary)}.`;
    }

    if (queryType === 'total_revenue') {
      const result = await Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
      ]);
      const totalRevenue = result[0]?.totalRevenue || 0;
      return `Total revenue from all orders is $${totalRevenue}.`;
    }

    return 'Database query type not recognized.';
  } catch (error) {
    return 'Error executing database query.';
  }
};
