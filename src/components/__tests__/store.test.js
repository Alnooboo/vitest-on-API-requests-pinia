import { describe, test, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";
import { useApi } from "@/store/Api";

vi.mock("axios");

describe("useApi Store", () => {
  beforeEach(() => {
    //run pinia before each test call
    setActivePinia(createPinia());
  });

  test("fetches posts correctly", async () => {
    //dummy API
    const mockPosts = [{ id: 1, title: "Test Post" }];
    //store the API with axios
    axios.get.mockResolvedValue({ data: mockPosts });

    //call the store
    const store = useApi();
    //fetch the data
    await store.fetchPosts();

    //cehck if the fetched data === dummy API
    expect(store.posts).toEqual(mockPosts);
  });

  test("handles errors correctly when fetching posts", async () => {
    //create an error message
    const errorMessage = "Network Error";
    //send the error message to the error case
    axios.get.mockRejectedValue(new Error(errorMessage));

    const store = useApi();
    //fetch the store with empty posts(no data)
    await store.fetchPosts();

    expect(store.posts).toEqual([]);
  });
});
